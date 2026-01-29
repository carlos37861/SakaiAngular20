import { Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';

import { TableColumn } from '@/shared/models/table-column.model';
import { TableAction } from '@/shared/models/table-action.model';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-table-general',
  standalone: true,
  imports: [NgClass, TableModule, ButtonModule, TooltipModule],
  templateUrl: './table-general.html',
  styleUrl: './table-general.scss'
})
export class TableGeneral {
  columns = signal<TableColumn[]>([]);
  data = signal<any[]>([]);
  actions = signal<TableAction[]>([]);

    // ✅ Paginación
  paginator = signal(true);
  rows = signal(10);
  rowsPerPageOptions = signal<number[]>([10, 30, 50]);

}
