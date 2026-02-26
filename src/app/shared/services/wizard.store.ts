import { Injectable, signal } from '@angular/core';
import { WizardKey } from '@/shared/constants/wizard-keys';

export type WizardState = Record<string, any>;

@Injectable({ providedIn: 'root' })
export class WizardStore {
  private map = signal<Record<string, WizardState>>({});

  get<T extends WizardState>(key: WizardKey): T | null {
    return (this.map()[key] as T) ?? null;
  }

  set<T extends WizardState>(key: WizardKey, patch: Partial<T>, replace = false) {
    const curr = (this.map()[key] ?? {}) as T;
    const next = (replace ? patch : { ...curr, ...patch }) as T;
    this.map.update(m => ({ ...m, [key]: next }));
  }

  clear(key: WizardKey) {
    this.map.update(m => {
      const copy = { ...m };
      delete copy[key];
      return copy;
    });
    sessionStorage.removeItem(this.ssKey(key));
  }

  persist(key: WizardKey) {
    const state = this.map()[key];
    if (!state) return;
    sessionStorage.setItem(this.ssKey(key), JSON.stringify(state));
  }

  hydrate(key: WizardKey) {
    const raw = sessionStorage.getItem(this.ssKey(key));
    if (!raw) return;
    try {
      const state = JSON.parse(raw);
      this.set(key, state, true);
    } catch {}
  }

  private ssKey(key: WizardKey) {
    return `WIZARD:${key}`;
  }
}