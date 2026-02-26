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

@Component({
  standalone: true,
  imports: [FiltedCard, TableGeneral, ButtonModule, CardModule,ConfirmDialogModule],
  templateUrl: './catologo-list.page.html',
})
export class CatalogoListPage {
  filterCard = viewChild(FiltedCard);
  table = viewChild(TableGeneral);

  // --- data ---
  rows = signal<any[]>([]);
  filtrosActuales = signal<any>({});

  // --- config filtros ---
filtersConfig = signal<FilterField[]>([
  { key: 'codigo', label: 'Código EMR', type: 'text', placeholder:'Ingrese código' },
  { key: 'descripcion', label: 'Descripción EMR', type: 'text' ,placeholder:'Ingrese descripción'},
  {
    key: 'tipo',
    label: 'Tipo',
    type: 'select',
    options: [
      { label: 'Todos', value: null },
      { label: 'Accesorio', value: 'Accesorio' },
      { label: 'Explosivo', value: 'Explosivo' }
    ]
  }
]);
  // --- config tabla ---
  tableColumns = signal<TableColumn[]>([
    { field: 'codigo', header: 'Código EMR' },
    { field: 'descripcion', header: 'Descripción' },
    { field: 'unidad', header: 'Und. de Medida' },
    { field: 'tipo', header: 'Tipo' }
  ]);

  tableActions = signal<TableAction[]>([
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

  // ✅ Cargar al entrar (opcional)
  this.buscar({});
}

  buscar(filtros: any) {
    this.catalogoService.getAll({
      codigo: filtros.codigo,
      descripcion: filtros.descripcion,
      tipo: filtros.tipo
    }).subscribe(res => {
      this.rows.set(res.Result ?? []);
    });
  }

  abrirCrearCatalogo() {
    this.router.navigateByUrl('/catalogo/create');
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
    header: 'Eliminar catálogo',
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
