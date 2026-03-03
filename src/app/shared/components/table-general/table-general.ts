import { Component, signal, effect } from '@angular/core';
import { NgClass } from '@angular/common';

import { TableColumn } from '@/shared/models/table-column.model';
import { TableAction } from '@/shared/models/table-action.model';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-table-general',
  standalone: true,
  imports: [NgClass, TableModule, ButtonModule, TooltipModule, TagModule],
  templateUrl: './table-general.html',
  styleUrl: './table-general.scss'
})
export class TableGeneral {
  columns = signal<TableColumn[]>([]);
  data = signal<any[]>([]);
  actions = signal<TableAction[]>([]);

  // selección
  selectable = signal(false);
  selection = signal<any[]>([]);

  onSelectionChange(value: any[] | any) {
    const arr = Array.isArray(value) ? value : (value ? [value] : []);
    this.selection.set(arr);
  }

  // expansión
  expandable = signal(false);
  childrenField = signal<string>('children');
  dataKey = signal<string>('codigo');

  expandedRowKeys = signal<Record<string, boolean>>({});

  // paginación
  paginator = signal(true);
  rows = signal(10);
  rowsPerPageOptions = signal<number[]>([10, 30, 50]);

  constructor() {
    effect(() => {
      this.data(); // track
      this.expandedRowKeys.set({});
      // opcional: si cambia la data, también limpia selección (depende tu caso)
      // this.selection.set([]);
    });
  }

  onExpandedRowKeysChange(keys: any) {
    this.expandedRowKeys.set((keys ?? {}) as Record<string, boolean>);
  }

  getExpandColspan(): number {
    const extraExpand = this.expandable() ? 1 : 0;
    const extraSelect = this.selectable() ? 1 : 0;
    const extraActions = this.actions().length ? 1 : 0;
    return this.columns().length + extraExpand + extraSelect + extraActions;
  }

  hasChildren(row: any): boolean {
    const field = this.childrenField();
    return (row?.[field]?.length ?? 0) > 0;
  }
}