import { Component, effect, signal, viewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormCard } from '@/shared/components/form-card/form-card';
import { FormField } from '@/shared/models/form-field.model';
import { CatalogoService } from '@/features/catalogo/services/catalogo.service';

@Component({
  standalone: true,
  imports: [FormCard],
  templateUrl: './lote-view.page.html',
})
export class LoteViewPage {

  formCard = viewChild(FormCard);

  //  signal para el código
  codigo = signal<string | null>(null);

  //  configuración del formulario
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
        { label: 'Kg', value: 'Kg' },
        { label: 'Mt', value: 'Mt' },
        { label: 'Gr', value: 'Gr' },
      ]
    },
  ]);

  private normalizarUnidad(u: any): string | null {
  const v = (u ?? '')
    .toString()
    .trim()
    .replace('.', ''); // ✅ quita el punto: "Und." -> "Und"

  const map: Record<string, string> = {
    'UND': 'Und',
    'Und': 'Und',
    'und': 'Und',

    'KG': 'Kg',   // ✅ aquí devolvemos "Kg" (sin punto)
    'Kg': 'Kg',
    'kg': 'Kg',

    'MT': 'Mt',
    'Mt': 'Mt',
    'mt': 'Mt',

    'GR': 'Gr',
    'Gr': 'Gr',
    'gr': 'Gr',
  };

  return map[v] ?? null;
}

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private catalogoService: CatalogoService
  ) {

    // 🔹 1) Escuchar parámetros con signals
    effect(() => {
      this.route.paramMap.subscribe(pm => {
        this.codigo.set(pm.get('codigo'));
      });
    });

    // 🔹 2) Mandar config al FormCard + poner readonly
    effect(() => {
      const card = this.formCard();
      if (!card) return;

      card.fields.set(this.formConfig());
      card.setReadonly(true);
    });

    // 🔹 3) Cuando cambie codigo → cargar
    effect(() => {
      const codigo = this.codigo();
      if (!codigo) return;

      this.cargar(codigo);
    });

    // 🔹 4) Cancelar
    effect(() => {
      const card = this.formCard();
      if (!card) return;

      const n = card.cancelClick();
      if (n === 0) return;

      this.router.navigateByUrl('/catalogo');
    });

    // 🔹 5) Bloquear guardar (por seguridad)
    effect(() => {
      const card = this.formCard();
      if (!card) return;

      const n = card.saveClick();
      if (n === 0) return;

      this.router.navigateByUrl('/catalogo');
    });
  }

  cargar(codigo: string) {
    this.catalogoService.getAll({ codigo }).subscribe({
      next: (res) => {
        const list = res?.Result ?? res?.Result ?? [];
        const row = Array.isArray(list) ? list[0] : null;
        if (!row) {
          // si no existe, vuelve a lista o muestra mensaje
          this.router.navigateByUrl('/catalogo');
          return;
        }

        const card = this.formCard();
        if (!card) return;

        card.setValue({
          codigo: row.codigo,
          descripcion: row.descripcion,
          tipo: row.tipo,
          unidad: this.normalizarUnidad(row.unidad) // ✅
        });

        card.setReadonly(true);
      },
      error: () => {
        this.router.navigateByUrl('/catalogo');
      }
    });
  }
}