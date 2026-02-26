import { Component, effect, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { FormField } from '@/shared/models/form-field.model';

import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-form-card',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    DatePickerModule,
    SelectModule,
    ButtonModule,
    TextareaModule
  ],
  templateUrl: './form-card.html',
  styleUrl: './form-card.scss'
})
export class FormCard {
  fields = signal<FormField[]>([]);

  // raw value (incluye disabled)
  valueChange = signal<any>({});

  // eventos
  saveClick = signal(0);
  cancelClick = signal(0);

  // botón principal
  showPrimary = signal(true);
  primaryLabel = signal('Guardar');

  // QR
  scanClick = signal(0);
  scanFieldKey = signal<string | null>(null);

  form: FormGroup;
  private valueSub?: Subscription;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});

    effect(() => {
      const fields = this.fields();
      if (!fields.length) return;

      this.valueSub?.unsubscribe();

      const group: any = {};
      fields.forEach(f => {
        const validators = [];
        if (f.required) validators.push(Validators.required);

        const defaultValue =
          f.type === 'select' ? null :
          f.type === 'number' ? 0 :
          f.type === 'date' ? null :
          '';

        group[f.key] = [{ value: defaultValue, disabled: !!f.disabled }, validators];
      });

      // reconstruye form
      this.form = this.fb.group(group);

      // inicializa y escucha cambios
      this.valueChange.set(this.form.getRawValue());
      this.valueSub = this.form.valueChanges.subscribe(() => {
        this.valueChange.set(this.form.getRawValue());
      });
    });
  }

  onSave() {
    this.saveClick.update(v => v + 1);
  }

  onCancel() {
    this.cancelClick.update(v => v + 1);
  }

  onScan(fieldKey: string) {
    this.scanFieldKey.set(fieldKey);
    this.scanClick.update(v => v + 1);
  }

  setValue(data: any) {
    if (!this.form) return;
    this.form.patchValue(data ?? {}, { emitEvent: false });
    this.valueChange.set(this.form.getRawValue());
  }

  setReadonly(readonly: boolean) {
    if (!this.form) return;
    if (readonly) this.form.disable({ emitEvent: false });
    else this.form.enable({ emitEvent: false });
    this.valueChange.set(this.form.getRawValue());
  }

  consumeSaveClick(): boolean {
    const n = this.saveClick();
    if (n === 0) return false;
    this.saveClick.set(0);
    return true;
  }

  consumeCancelClick(): boolean {
    const n = this.cancelClick();
    if (n === 0) return false;
    this.cancelClick.set(0);
    return true;
  }

  get formGroup() {
    return this.form;
  }
}