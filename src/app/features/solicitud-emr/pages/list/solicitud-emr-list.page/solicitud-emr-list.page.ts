import { Component, effect, signal, viewChild, untracked } from '@angular/core';

import { FiltedCard } from '@/shared/components/filted-card/filted-card';
import { TableGeneral } from '@/shared/components/table-general/table-general';

import { FilterField } from '@/shared/models/filter-field.model';
import { TableColumn } from '@/shared/models/table-column.model';
import { TableAction } from '@/shared/models/table-action.model';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  standalone: true,
  imports: [FiltedCard, TableGeneral, ButtonModule,CardModule],
  templateUrl: './solicitud-emr-list.page.html'
})
export class SolicitudEmrListPage {
  filterCard = viewChild(FiltedCard);
  table = viewChild(TableGeneral);

  // --- data ---
  rows = signal<any[]>([]);
  filtrosActuales = signal<any>({});

  // --- config filtros ---
  filtersConfig = signal<FilterField[]>([
    { key: 'codigo', label: 'Código Solicitud', type: 'text' },
    { key: 'zona', label: 'Zona', type: 'text' },
    { key: 'desde', label: 'Desde', type: 'date' },
    { key: 'hasta', label: 'Hasta', type: 'date' },
    {
      key: 'estado',
      label: 'Estado',
      type: 'select',
      options: [
        { label: 'Todos', value: null },
        { label: 'Activo', value: 'A' },
        { label: 'Anulado', value: 'N' },
      ]
    }
  ]);

  // --- config tabla ---
  tableColumns = signal<TableColumn[]>([
    { field: 'codigo', header: 'Código Solicitud' },
    { field: 'zona', header: 'Zona' },
    // agrega los demás cuando tengas data real
    // { field: 'fecha', header: 'Fecha' },
    // { field: 'guardia', header: 'Guardia' },
  ]);

  tableActions = signal<TableAction[]>([
    {
      icon: 'pi pi-eye',
      tooltip: 'Ver',
      onClick: row => this.ver(row)
    },
    {
      icon: 'pi pi-pencil',
      tooltip: 'Editar',
      onClick: row => this.editar(row)
    },
    {
      icon: 'pi pi-trash',
      tooltip: 'Eliminar',
      colorClass: 'p-button-danger',
      onClick: row => this.eliminar(row)
    }
  ]);

  constructor() {
    // ===== Filtros: mandar config al hijo
    effect(() => {
      const card = this.filterCard();
      if (!card) return;
      card.fields.set(this.filtersConfig());
    });

    // ===== Filtros: snapshot (no buscar)
    effect(() => {
      const card = this.filterCard();
      if (!card) return;
      this.filtrosActuales.set(card.filtersChange());
    });

    // ===== Buscar: solo con click
    effect(() => {
      const card = this.filterCard();
      if (!card) return;

      card.searchClick(); // depende del click
      const filtros = untracked(() => this.filtrosActuales());
      this.buscar(filtros);
    });

    // ===== Tabla: inyectar config + data a TableGeneral
    effect(() => {
      const table = this.table();
      if (!table) return;

      table.columns.set(this.tableColumns());
      table.actions.set(this.tableActions());
      table.data.set(this.rows());
    });
  }

  buscar(filtros: any) {
    console.log('Buscando con:', filtros);

    // mock
    this.rows.set([
      { codigo: 'EMR2025000004', zona: 'San Francisco' },
      { codigo: 'EMR2025000003', zona: 'San Francisco' },
      { codigo: 'EMR2025000004', zona: 'San Francisco' },
      { codigo: 'EMR2025000003', zona: 'San Francisco' },
      { codigo: 'EMR2025000004', zona: 'San Francisco' },
      { codigo: 'EMR2025000003', zona: 'San Francisco' },
      { codigo: 'EMR2025000004', zona: 'San Francisco' },
      { codigo: 'EMR2025000003', zona: 'San Francisco' },
      { codigo: 'EMR2025000004', zona: 'San Francisco' },
      { codigo: 'EMR2025000003', zona: 'San Francisco' },
      { codigo: 'EMR2025000004', zona: 'San Francisco' },
      { codigo: 'EMR2025000003', zona: 'San Francisco' },
      { codigo: 'EMR2025000004', zona: 'San Francisco' },
      { codigo: 'EMR2025000003', zona: 'San Francisco' },
      { codigo: 'EMR2025000004', zona: 'San Francisco' },
      { codigo: 'EMR2025000003', zona: 'San Francisco' },
      { codigo: 'EMR2025000004', zona: 'San Francisco' },
      { codigo: 'EMR2025000003', zona: 'San Francisco' },
      { codigo: 'EMR2025000004', zona: 'San Francisco' },
      { codigo: 'EMR2025000003', zona: 'San Francisco' },
      { codigo: 'EMR2025000004', zona: 'San Francisco' },
      { codigo: 'EMR2025000003', zona: 'San Francisco' },
    ]);
  }

  abrirCrearSolicitud() {
    // abrir modal
    console.log('Crear Solicitud');
  }

  exportarExcel() {
    console.log('Exportar Excel');
  }

  // --- acciones tabla ---
  ver(row: any) {
    console.log('Ver', row);
  }

  editar(row: any) {
    console.log('Editar', row);
  }

  eliminar(row: any) {
    console.log('Eliminar', row);
  }
}
