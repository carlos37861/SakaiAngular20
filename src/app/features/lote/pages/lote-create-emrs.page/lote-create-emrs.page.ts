import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';

import { WizardStore } from '@/shared/services/wizard.store';
import { WIZARD_KEYS } from '@/shared/constants/wizard-keys';

interface Emr {
  item: number;
  codigo: string;
  descripcion: string;
}

@Component({
  selector: 'app-lote-create-emrs.page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lote-create-emrs.page.html',
  styleUrl: './lote-create-emrs.page.scss',
})
export class LoteCreateEmrsPage {
  paso1: any = null;

  selected = signal<Emr[]>([]);

  emrsDisponibles = signal<Emr[]>([
    { item: 1, codigo: 'EMR2025000001', descripcion: 'Emulnor 3000 1x7' },
    { item: 2, codigo: 'EMR2025000002', descripcion: 'Emulnor 3000 1x7' },
    { item: 3, codigo: 'EMR2025000003', descripcion: 'Emulnor 3000 1x7' },
    { item: 4, codigo: 'EMR2025000004', descripcion: 'Emulnor 3000 1x7' },
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
  }

  isSelected(codigo: string): boolean {
    return this.selected().some(e => e.codigo === codigo);
  }

  toggle(row: Emr) {
    const exists = this.isSelected(row.codigo);

    const updated = exists
      ? this.selected().filter(x => x.codigo !== row.codigo)
      : [...this.selected(), row];

    this.selected.set(updated);

    this.wizard.set(WIZARD_KEYS.LOTE_CREATE, { emrs: updated });
    this.wizard.persist(WIZARD_KEYS.LOTE_CREATE);
  }

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