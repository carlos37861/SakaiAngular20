import { Component, effect, signal, viewChild, untracked } from '@angular/core';
import { Router } from '@angular/router';

import { FormCard } from '@/shared/components/form-card/form-card';
import { FormField } from '@/shared/models/form-field.model';
import { Qrscanner } from '@/shared/components/qrscanner/qrscanner';

import { WizardStore } from '@/shared/services/wizard.store';
import { WIZARD_KEYS } from '@/shared/constants/wizard-keys';

@Component({
  standalone: true,
  imports: [FormCard, Qrscanner],
  templateUrl: './lote-create.page.html',
})
export class LoteCreatePage {
  formCard = viewChild(FormCard);
  qrDlg = viewChild(Qrscanner);

  private lastKeyToFill: string | null = null;
  private inited = false;
  private lastAutoSaved: string | null = null;

  formConfig = signal<FormField[]>([
    { key: 'rgId', label: 'RG/ID', type: 'text', required: true, placeholder: 'Ingrese RG/ID' },
    { key: 'nombreProducto', label: 'Nombre del Producto', type: 'text', required: true, placeholder: 'Ingrese nombre del producto' },
    { key: 'estado', label: 'Estado', type: 'text', required: true, disabled: true, placeholder: '' },
    { key: 'lote', label: 'Lote', type: 'text', required: true, placeholder: 'Ingrese lote' },
    { key: 'fechaProduccion', label: 'Fecha Producción', type: 'date', required: true },
    { key: 'fechaVencimiento', label: 'Fecha Vencimiento', type: 'date', required: true },
    { key: 'cantidad', label: 'Cantidad', type: 'number', required: true, placeholder: '0' },
    {
      key: 'unidadMedida',
      label: 'Und. Medida',
      type: 'select',
      required: true,
      options: [
        { label: 'Elegir', value: null },
        { label: 'UND', value: 'UND' },
        { label: 'Kg', value: 'Kg' },
        { label: 'Mtrs', value: 'Mtrs' },
        { label: 'Pzas', value: 'Pzas' },
      ],
    },
    { key: 'turno', label: 'Turno', type: 'number', required: true, placeholder: '1' },
    { key: 'pesoNeto', label: 'Peso neto (Kg)', type: 'number', required: true, placeholder: '0.00' },
    { key: 'pesoBruto', label: 'Peso bruto (Kg)', type: 'number', required: true, placeholder: '0.00' },
    { key: 'observacion', label: 'Observación', type: 'textarea', required: false, placeholder: 'Ingrese observación' },
  ]);

  constructor(
    private router: Router,
    private wizard: WizardStore,
  ) {
    // 1) hydrate apenas entra
    this.wizard.hydrate(WIZARD_KEYS.LOTE_CREATE);

    // 2) init FormCard UNA sola vez (no lo reconstruyas en cada cambio)
    effect(() => {
      const card = this.formCard();
      if (!card || this.inited) return;
      this.inited = true;

      card.primaryLabel.set('Siguiente');
      card.showPrimary.set(true);

      // primero crear el form
      card.fields.set(this.formConfig());

      // luego aplicar valores guardados (IMPORTANTE)
      const saved = untracked(() => this.wizard.get<any>(WIZARD_KEYS.LOTE_CREATE));
      const paso1 = saved?.paso1 ?? { estado: 'Registrado' };

      queueMicrotask(() => {
        card.setValue(this.normalizePaso1(paso1));
      });
    });

    // 3) AUTOSAVE reactivo (no guarda defaults)
    effect(() => {
      const card = this.formCard();
      if (!card) return;

      const raw = card.valueChange();

      // si aún no se tocó el form, no pises lo guardado
      if (card.formGroup.pristine) return;

      const key = JSON.stringify(raw ?? {});
      if (key === this.lastAutoSaved) return;

      this.lastAutoSaved = key;
      this.wizard.set(WIZARD_KEYS.LOTE_CREATE, { paso1: raw });
      this.wizard.persist(WIZARD_KEYS.LOTE_CREATE);
    });

    // 4) scanner abrir
    effect(() => {
      const card = this.formCard();
      const dlg = this.qrDlg();
      if (!card || !dlg) return;

      const n = card.scanClick();
      if (n === 0) return;

      const fieldKey = untracked(() => card.scanFieldKey());
      if (!fieldKey) return;

      this.lastKeyToFill = fieldKey;
      dlg.open();
    });

    // 5) scanner set value
    effect(() => {
      const dlg = this.qrDlg();
      const card = this.formCard();
      if (!dlg || !card) return;

      const n = dlg.scanSuccessClick();
      if (n === 0) return;

      const value = untracked(() => dlg.scannedValue());
      if (!value) return;

      const key = this.lastKeyToFill ?? 'rgId';
      card.formGroup.get(key)?.setValue(value);
    });

    // 6) cancelar
    effect(() => {
      const card = this.formCard();
      if (!card) return;

      if (!card.consumeCancelClick()) return;

      this.wizard.clear(WIZARD_KEYS.LOTE_CREATE);
      this.router.navigateByUrl('/lote');
    });

    // 7) siguiente
    effect(() => {
      const card = this.formCard();
      if (!card) return;

      if (!card.consumeSaveClick()) return;

      const payload = untracked(() => card.formGroup.getRawValue());
      this.wizard.set(WIZARD_KEYS.LOTE_CREATE, { paso1: payload });
      this.wizard.persist(WIZARD_KEYS.LOTE_CREATE);

      this.router.navigateByUrl('/lote/create/emrs');
    });
  }

  private normalizePaso1(p: any) {
    return {
      ...p,
      // PrimeNG DatePicker necesita Date
      fechaProduccion: p?.fechaProduccion ? new Date(p.fechaProduccion) : null,
      fechaVencimiento: p?.fechaVencimiento ? new Date(p.fechaVencimiento) : null,
    };
  }
}