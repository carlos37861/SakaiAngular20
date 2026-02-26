import { Component, effect, signal, viewChild, untracked } from '@angular/core';
import { Router } from '@angular/router';

import { FiltedCard } from '@/shared/components/filted-card/filted-card';
import { TableGeneral } from '@/shared/components/table-general/table-general';

import { FilterField } from '@/shared/models/filter-field.model';
import { TableColumn } from '@/shared/models/table-column.model';
import { TableAction } from '@/shared/models/table-action.model';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CatalogoService } from '@/features/catalogo/services/catalogo.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { LoteMockResponse } from '@/core/services/mocks/lote.mock';

@Component({
  standalone: true,
  imports: [FiltedCard, TableGeneral, ButtonModule, CardModule,ConfirmDialogModule],
  templateUrl: './lote-list.page.html',
})
export class LoteListPage {
  filterCard = viewChild(FiltedCard);
  table = viewChild(TableGeneral);

  // --- data ---
  rows = signal<any[]>([]);
  filtrosActuales = signal<any>({});

  // --- config filtros ---
filtersConfig = signal<FilterField[]>([
  { key: 'código de Lote', label: 'Código de Lote', type: 'text', placeholder:'Ingrese código' },
  { key: 'Fecha de vencimiento', label: 'Fecha de Vencimiento', type: 'date' ,placeholder:'Ingrese descripción'},
  {
    key: 'tipo',
    label: 'Tipo',
    type: 'select',
    options: [
      { label: 'Todos', value: null },
      { label: 'Accesorio', value: 'Accesorio' },
      { label: 'Explosivo', value: 'Explosivo' }
    ]
  },
    {
    key: 'tipo',
    label: 'Estado',
    type: 'select',
    options: [
      { label: 'Todos', value: null },
      { label: 'Disponible', value: 'd' },
      { label: 'Próximos a vencer', value: 'pv' },
      { label: 'Vencido', value: 'v' },
    ]
  }
]);
// --- config tabla (Lotes) ---
tableColumns = signal<TableColumn[]>([
  { field: 'codigo', header: 'Código Lote', width: '130px' },
  { field: 'descripcion', header: 'Descripción', width: '260px' },
  { field: 'fechaProduccion', header: 'Fecha Producción', width: '140px' },
  { field: 'fechaVencimiento', header: 'Fecha Vencimiento', width: '150px' },
  { field: 'cantidadTotal', header: 'Cantidad Total', width: '130px' },
  { field: 'unidad', header: 'Und. Medida', width: '110px' },
  { field: 'pesoNeto', header: 'Peso Neto (KG)', width: '130px' },
  { field: 'estado', header: 'Estado', width: '170px' },
]);

  tableActions = signal<TableAction[]>([
    {
      icon: 'pi pi-book',
      tooltip: 'Detalles',
      onClick: row => this.router.navigateByUrl(`/catalogo/view/${row.codigo}`)
    },
    {
      icon: 'pi pi-pencil',
      tooltip: 'Editar',
      onClick: row => this.router.navigateByUrl(`/catalogo/view/${row.codigo}`)
    },
    {
      icon: 'pi pi-trash',
      tooltip: 'Eliminar',
      colorClass: 'p-button-danger',
      onClick: row => this.eliminar(row)
    }
    
  ]);

 constructor(private router: Router, private catalogoService: CatalogoService,private confirm: ConfirmationService) {

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
    if (n === 0) return; // ✅ evita que busque al inicio

    const filtros = untracked(() => card.filtersChange()); // ✅ lee directo del form
    this.buscar(filtros);
  });

  // ===== Limpiar: SOLO cuando se haga click
effect(() => {
  const card = this.filterCard();
  if (!card) return;

  const n = card.clearClick();
  if (n === 0) return;

  // ✅ al limpiar: vuelve a cargar TODO
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

effect(() => {
  const table = this.table();
  if (!table) return;

  table.columns.set(this.tableColumns());
  table.actions.set(this.tableActions());
  table.data.set(this.rows());

  table.expandable.set(true);
  table.childrenField.set('emrs'); // <- tu mock usa emrs
  table.dataKey.set('codigo');     // <- debe ser único
});
  // ✅ Cargar al entrar (opcional)
  this.buscar({});
}

buscar(filtros: any) {
  this.rows.set(LoteMockResponse.Result ?? []);
}
  abrirCrearLote() {
    this.router.navigateByUrl('/lote/create');
  }

  exportExcel() {
    console.log('Exportar Excel');
  }

  editar(row: any) {
    console.log('Editar', row);
  }

eliminar(row: any) {
  const codigo = row?.codigo;
  if (!codigo) return;

  this.confirm.confirm({
    header: 'Eliminar Lote',
    message: `¿Seguro que deseas eliminar el registro ${codigo}?`,
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sí, eliminar',
    rejectLabel: 'Cancelar',
    acceptButtonStyleClass: 'p-button-danger',
    rejectButtonStyleClass: 'p-button-secondary p-button-outlined',

    accept: () => {
      // ✅ eliminación instantánea (mock)
      this.rows.update(list => list.filter(x => x.codigo !== codigo));
    }
  });
}
}
