import { Injectable, inject } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class SolicitudEmrWizardStateService {
  private fb = inject(FormBuilder);

  // PASO 1
  infoForm = this.fb.group({
    codigoSolicitud: [{ value: '', disabled: true }],
    solicitante: [{ value: '', disabled: true }],
    estado: [{ value: 'Pendiente', disabled: true }],

    fechaSolicitud: [null as Date | null, Validators.required],
    zona: ['', Validators.required],
    guardia: [null as string | null, Validators.required],
    tipoDisparo: [null as string | null, Validators.required],

    observacion: [''],
  });

  // PASO 2
  detalleForm = this.fb.group({
    items: this.fb.array([]),
  });

  get items(): FormArray {
    return this.detalleForm.get('items') as FormArray;
  }

  addItem(item: { codigo: string; descripcion: string; um: string; cantidad: number }) {
    this.items.push(
      this.fb.group({
        codigo: [item.codigo, Validators.required],
        descripcion: [item.descripcion],
        um: [item.um],
        cantidad: [item.cantidad, [Validators.required, Validators.min(1)]],
      })
    );
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  buildPayload() {
    return {
      ...this.infoForm.getRawValue(),
      detalle: this.detalleForm.value.items,
    };
  }

  reset() {
    this.infoForm.reset({
      estado: 'Pendiente',
    });
    this.items.clear();
  }
}
