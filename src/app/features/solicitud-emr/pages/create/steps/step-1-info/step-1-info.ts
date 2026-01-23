import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';

import { SolicitudEmrWizardStateService } from '@/features/solicitud-emr/services/solicitud-emr-wizard-state.service';

@Component({
  standalone: true,
  selector: 'app-step-1-info',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    SelectModule,
    DatePickerModule,
    TextareaModule,
  ],
  templateUrl: './step-1-info.html',
  styleUrl: './step-1-info.scss',
})
export class Step1Info {
  state = inject(SolicitudEmrWizardStateService);

  guardias = [
    { label: 'Día', value: 'DIA' },
    { label: 'Noche', value: 'NOCHE' },
  ];

  tiposDisparo = [
    { label: 'T', value: 'T' },
    { label: 'F', value: 'F' },
  ];
}