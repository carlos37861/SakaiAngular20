import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { SolicitudEmrWizardStateService } from '@/features/solicitud-emr/services/solicitud-emr-wizard-state.service';

@Component({
  standalone: true,
  selector: 'app-step-2-detalle',
  imports: [
    CommonModule,
    FormsModule,           // ✅ NECESARIO para ngModel
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './step-2-detalle.html',
  styleUrl: './step-2-detalle.scss',
})
export class Step2Detalle {
  state = inject(SolicitudEmrWizardStateService);

  codigoTmp = '';
  descripcionTmp = '';
  umTmp = 'Und.';
  cantidadTmp = 1;

  agregar() {
    if (!this.codigoTmp || this.cantidadTmp <= 0) return;

    this.state.addItem({
      codigo: this.codigoTmp,
      descripcion: this.descripcionTmp,
      um: this.umTmp,
      cantidad: this.cantidadTmp,
    });

    this.codigoTmp = '';
    this.descripcionTmp = '';
    this.umTmp = 'Und.';
    this.cantidadTmp = 1;
  }
}
