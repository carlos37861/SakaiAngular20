import { CommonModule } from '@angular/common';
import { Component, effect, signal, viewChild, untracked } from '@angular/core';
import { Router } from '@angular/router';

import { WizardStore } from '@/shared/services/wizard.store';
import { WIZARD_KEYS } from '@/shared/constants/wizard-keys';

import { TableGeneral } from '@/shared/components/table-general/table-general';

import { TableColumn } from '@/shared/models/table-column.model';
import { TableAction } from '@/shared/models/table-action.model';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

interface Emr {
  item: number;
  codigo: string;
  descripcion: string;
}

@Component({
  selector: 'app-lote-create-emrs.page',
  standalone: true,
  imports: [CommonModule, TableGeneral, ButtonModule, CardModule],
  templateUrl: './lote-create-emrs.page.html',
  styleUrl: './lote-create-emrs.page.scss',
})
export class LoteCreateEmrsPage {
  table = viewChild(TableGeneral);

  paso1: any = null;

  selected = signal<Emr[]>([]);

  emrsDisponibles = signal<Emr[]>([
    { item: 1, codigo: 'EMR2025000001', descripcion: 'Emulnor 3000 1x7' },
    { item: 2, codigo: 'EMR2025000002', descripcion: 'Emulnor 3000 1x7' },
    { item: 3, codigo: 'EMR2025000003', descripcion: 'Emulnor 3000 1x7' },
    { item: 4, codigo: 'EMR2025000004', descripcion: 'Emulnor 3000 1x7' },
  ]);

  tableColumns = signal<TableColumn[]>([
    { field: 'item', header: 'Item', width: '90px' },
    { field: 'codigo', header: 'Código', width: '220px' },
    { field: 'descripcion', header: 'Descripción' },
  ]);

  tableActions = signal<TableAction[]>([
    {
      icon: 'pi pi-qrcode',
      tooltip: 'Generar QR',
      onClick: (row) => this.generarQR(row),
    }
  ]);

  constructor(
    private router: Router,
    private wizard: WizardStore
  ) {
    this.wizard.hydrate(WIZARD_KEYS.LOTE_CREATE);

    const state = this.wizard.get<any>(WIZARD_KEYS.LOTE_CREATE);
    this.paso1 = state?.paso1 ?? null;

    if (!this.paso1) {
      this.router.navigateByUrl('/lote/create');
      return;
    }

    if (state?.emrs) this.selected.set(state.emrs);

    // ===== Configurar tabla
    effect(() => {
      const table = this.table();
      if (!table) return;

      table.columns.set(this.tableColumns());
      table.data.set(this.emrsDisponibles());

      table.dataKey.set('codigo');

      table.expandable.set(false);
      table.actions.set(this.tableActions());

      // ✅ habilitar selección
      table.selectable.set(true);

      // ✅ cargar selección previa (wizard)
      table.selection.set(this.selected());
    });

    // ===== Persistir selección cuando cambia
    effect(() => {
      const table = this.table();
      if (!table) return;

      const sel = table.selection();
      const current = untracked(() => this.selected());

      if (sameByCodigo(current, sel)) return;

      this.selected.set(sel);

      this.wizard.set(WIZARD_KEYS.LOTE_CREATE, { emrs: sel });
      this.wizard.persist(WIZARD_KEYS.LOTE_CREATE);
    });
  }

  // ===== acciones top
  agregarMaterial() {
    console.log('Agregar Material (abrir modal / navegar)');
    alert('Agregar Material (pendiente: modal o ruta)');
  }

  impresionMasiva() {
    const seleccionados = this.selected();

    if (!seleccionados.length) {
      alert('Seleccione al menos un EMR');
      return;
    }

    const codigos = seleccionados.map(x => x.codigo);
    console.log('Impresión masiva:', codigos);

    alert('Impresión masiva: revisa consola');
  }

  // ===== acción QR por fila
  generarQR(row: Emr) {
    const codigo = row.codigo;
    console.log('Generar QR para:', codigo);
    alert(`QR generado para ${codigo} (pendiente: dialog con QR real)`);
  }

  // ===== navegación
  atras() {
    this.router.navigateByUrl('/lote/create');
  }

  cancelar() {
    this.wizard.clear(WIZARD_KEYS.LOTE_CREATE);
    this.router.navigateByUrl('/lote');
  }

  finalizar() {
    const s = this.wizard.get<any>(WIZARD_KEYS.LOTE_CREATE);

    const payloadFinal = {
      ...s?.paso1,
      emrs: s?.emrs ?? [],
    };

    console.log('PAYLOAD FINAL:', payloadFinal);
    alert('Revisa consola: PAYLOAD FINAL');
  }
}

function sameByCodigo(a: Emr[], b: Emr[]) {
  if (a.length !== b.length) return false;
  const sa = new Set(a.map(x => x.codigo));
  for (const x of b) if (!sa.has(x.codigo)) return false;
  return true;
}