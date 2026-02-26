export const WIZARD_KEYS = {
  LOTE_CREATE: 'lote-create',

} as const;

export type WizardKey = typeof WIZARD_KEYS[keyof typeof WIZARD_KEYS];