
import { Component, effect, signal, viewChild, untracked } from '@angular/core';
import { Router } from '@angular/router';

import { FiltedCard } from '@/shared/components/filted-card/filted-card';
import { TableGeneral } from '@/shared/components/table-general/table-general';

import { FilterField } from '@/shared/models/filter-field.model';
import { TableColumn } from '@/shared/models/table-column.model';
import { TableAction } from '@/shared/models/table-action.model';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { StockService } from '../../services/stock.service';
import { calcularEstado } from '@/shared/utils/stock.utils';

@Component({
  selector: 'app-stock-list.page',
  standalone: true,
  imports: [FiltedCard, TableGeneral, ButtonModule, CardModule,ConfirmDialogModule],
  templateUrl: './stock-list.page.html',
  styles: ``
})
export class StockListPage {
  filterCard = viewChild(FiltedCard);
  table = viewChild(TableGeneral);

  // --- datos da llenar ---
  rows = signal<any[]>([]);
  filtrosActuales = signal<any>({});

  // --- config filtros ---
  filtersConfig = signal<FilterField[]>([
    { key: 'codigo', label: 'Código EMR', type: 'text', placeholder:'Ingrese código' },
    {
      key: 'estadoEmr',
      label: 'Estado',
      type: 'select',
      options: [
        { label: 'Todos', value: null },
        { label: 'Stock en Alerta', value: 'sa' },
        { label: 'Stock Disponible', value: 'sd' },
        { label: 'Stock crítico', value: 'sc' }
      ]
    }
  ]);
  // --- config tabla ---
  tableColumns = signal<TableColumn[]>([
    { field: 'codigo', header: 'Código EMR' },
    { field: 'descripcion', header: 'Descripción' },
    { field: 'unidad', header: 'Und. de Medida' },
    { field: 'tipo', header: 'Tipo' },
    { field: 'stockActual', header: 'Stock Total' },
    { field: 'stockMinimo', header: 'Stock Mínimo' },
    { field: 'estado', header: 'Estado' },
  ]);

  tableActions = signal<TableAction[]>([
    {
      icon: 'pi pi-pencil',
      tooltip: 'Editar',
      onClick: row => this.router.navigateByUrl(`/stock/view/${row.codigo}`)
    },

    
  ]);


 constructor(private router: Router, private stockService: StockService,private confirm: ConfirmationService) {

  // ===== Filtros: mandar config al hijo
  effect(() => {
    const card = this.filterCard();
    if (!card) return;
    card.fields.set(this.filtersConfig());
  });

  // ===== Filtros: snapshot
  effect(() => {
    const card = this.filterCard();
    if (!card) return;
    this.filtrosActuales.set(card.filtersChange());
  });

  // ===== Buscar: solo con click
  effect(() => {
    const card = this.filterCard();
    if (!card) return;

    const n = card.searchClick();
    if (n === 0) return; //  evita que busque al inicio

    const filtros = untracked(() => card.filtersChange()); //  lee directo del form
    this.buscar(filtros);
  });

  // ===== Limpiar: SOLO cuando se haga click
effect(() => {
  const card = this.filterCard();
  if (!card) return;

  const n = card.clearClick();
  if (n === 0) return;

  //  al limpiar: vuelve a cargar TODO
  this.buscar({});
});

  // ===== Tabla: inyectar config + data
effect(() => {
  const table = this.table();
  if (!table) return;

  table.columns.set(this.tableColumns());
  table.actions.set(this.tableActions());
  table.data.set(this.rows());
});

  // Cargar al entrar (opcional)
  this.buscar({});
}

buscar(filtros: any) {
  this.stockService.getAll({
    codigo: filtros.codigo
    // no mandes estado al service si estado es derivado
  }).subscribe(res => {
    const list = res.Result ?? [];

    // 1) calcular estado para UI
    const viewRows = list.map(x => ({
      ...x,
      estado: calcularEstado(x.stockActual, x.stockMinimo) // ✅ ahora existe row.estado
    }));

    // 2) filtrar por estadoEmr (sa/sd/sc)
    const estadoEmr = filtros.estadoEmr ?? null;

    const filteredRows = viewRows.filter(x => {
      if (!estadoEmr) return true; // Todos
 
      if (estadoEmr === 'sa') return x.estado === 'Alerta';
      if (estadoEmr === 'sd') return x.estado === 'Disponible';
      if (estadoEmr === 'sc') return x.estado === 'Crítico';

      return true;
    });

    this.rows.set(filteredRows);
  });
}

  abrirCrearStock() {
    this.router.navigateByUrl('/stock/create');
  }

  exportExcel() {
    console.log('Exportar Excel');
  }

  eliminar(row: any) {
    const codigo = row?.codigo;
    if (!codigo) return;

    this.confirm.confirm({
      header: 'Eliminar stock',
      message: `¿Seguro que deseas eliminar el registro ${codigo}?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary p-button-outlined',

      accept: () => {
        // eliminación instantánea (mock)
        this.rows.update(list => list.filter(x => x.codigo !== codigo));
      }
    });
  }

}


