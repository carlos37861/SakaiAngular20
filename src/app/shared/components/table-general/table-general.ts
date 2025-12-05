import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-table-general',
  standalone: true,        // ← IMPORTANTE
  imports: [CommonModule,TableModule],
  templateUrl: './table-general.html',
  styleUrls: ['./table-general.scss'], // ← debe ser styleUrls
})
export class TableGeneralComponent {
  @Input() columns: { field: string; header: string }[] = [];
  @Input() data: any[] = [];

  // ⭐ NECESARIO PARA QUE NO DE ERROR
  @Input() filters: { field: string; type: string; placeholder: string }[] = [];
}