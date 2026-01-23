import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { SearchPageLayout } from '@/shared/components/search-page-layout/search-page-layout';

type EstadoFiltro = 'TODOS' | 'PENDIENTE' | 'APROBADO' | 'ANULADO';

interface SolicitudEmrRow {
  codigo: string;
  fecha: string;     // puedes cambiar a Date si tu backend lo trae así
  zona: string;
  guardia: string;
  labor: string;
  tipoDisparo: string;
  maquina: string;
}

@Component({
  standalone: true,
  selector: 'app-solicitud-emr-list-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    DatePickerModule,
    SearchPageLayout, 
  ],
  templateUrl: './solicitud-emr-list.page.html',
  styleUrl: './solicitud-emr-list.page.scss',
})
export class SolicitudEmrListPage {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  // Form filtros
  filtrosForm = this.fb.group({
    codigo: [''],
    zona: [''],
    estado: ['TODOS' as EstadoFiltro],
    desde: [null as Date | null],
    hasta: [null as Date | null],
  });

  estados = [
    { label: 'Todos', value: 'TODOS' },
    { label: 'Pendiente', value: 'PENDIENTE' },
    { label: 'Aprobado', value: 'APROBADO' },
    { label: 'Anulado', value: 'ANULADO' },
  ];

  // Data mock (luego lo reemplazas por tu service)
  rows: SolicitudEmrRow[] = [
    { codigo: 'EMR2025000004', fecha: '30/11/2025', zona: 'San Francisco', guardia: 'Noche', labor: 'EST 470W', tipoDisparo: 'T', maquina: 'SECAN #9' },
    { codigo: 'EMR2025000003', fecha: '30/11/2025', zona: 'San Francisco', guardia: 'Día', labor: 'TJ 030W', tipoDisparo: 'F', maquina: 'SECAN #3' },
    { codigo: 'EMR2025000002', fecha: '01/12/2025', zona: 'Charapos', guardia: 'Noche', labor: 'TJ 201W', tipoDisparo: 'F', maquina: 'RPN #9' },
    { codigo: 'EMR2025000001', fecha: '01/12/2025', zona: 'Charapos', guardia: 'Día', labor: 'TJ 201W', tipoDisparo: 'T', maquina: 'RPN #8' },
  ];

  // ========= Acciones =========

  crearSolicitud() {
    this.router.navigate(['/solicitud-emr/nuevo']);
  }

  exportExcel() {
    // Aquí luego conectas tu export real
    console.log('Export Excel con filtros:', this.filtrosForm.getRawValue());
  }

  buscar() {
    // Aquí luego llamas al service y recargas la tabla
    console.log('Buscar con filtros:', this.filtrosForm.getRawValue());
  }

  limpiar() {
    this.filtrosForm.reset({
      codigo: '',
      zona: '',
      estado: 'TODOS',
      desde: null,
      hasta: null,
    });
  }

  editar(row: SolicitudEmrRow) {
    // Si luego quieres editar por wizard
    this.router.navigate(['/solicitud-emr/editar', row.codigo]);
  }

  ver(row: SolicitudEmrRow) {
    console.log('Ver:', row);
  }

  eliminar(row: SolicitudEmrRow) {
    console.log('Eliminar:', row);
  }
}
