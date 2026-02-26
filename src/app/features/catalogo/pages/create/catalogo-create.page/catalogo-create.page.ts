import { Component, effect, signal, viewChild, untracked } from '@angular/core';
import { Router } from '@angular/router';

import { FormCard } from '@/shared/components/form-card/form-card';
import { FormField } from '@/shared/models/form-field.model';

@Component({
  standalone: true,
  imports: [FormCard],
  templateUrl: './catalogo-create.page.html',
})
export class CatalogoCreatePage {
  formCard = viewChild(FormCard);

  formConfig = signal<FormField[]>([
    { key: 'codigo', label: 'Código EMR', type: 'text', required: true, placeholder: 'Ingrese código' },
    { key: 'descripcion', label: 'Descripción', type: 'text', required: true, placeholder: 'Ingrese descripción' },
    {
      key: 'tipo',
      label: 'Tipo',
      type: 'select',
      required: true,
      options: [
         { label: 'Elegir', value: null }, 
        { label: 'Accesorio', value: 'Accesorio' },
        { label: 'Explosivo', value: 'Explosivo' }
      ]
    },
    {
      key: 'unidad',
      label: 'Unidad de Medida',
      type: 'select',
      required: true,
      options: [
        { label: 'Elegir', value: null }, 
        { label: 'Und', value: 'Und' },
        { label: 'Kg', value: 'kg' },
        { label: 'Mt', value: 'Mt' },
        { label: 'Gr', value: 'Gr' },
      ]
    },

  ]);

  constructor(private router: Router) {
    // mandar config al hijo
    effect(() => {
      const card = this.formCard();
      if (!card) return;
      card.fields.set(this.formConfig());
    });

    // cancelar
    effect(() => {
      const card = this.formCard();
      if (!card) return;

      const n = card.cancelClick();
      if (n === 0) return;

      this.router.navigateByUrl('/catalogo');
    });

    // guardar
    effect(() => {
      const card = this.formCard();
      if (!card) return;

      const n = card.saveClick();
      if (n === 0) return;

      const payload = untracked(() => card.valueChange());
      console.log('payload:', payload);

      // aquí luego llamas a tu servicio create(...)
      this.router.navigateByUrl('/catalogo');
    });
  }
}
