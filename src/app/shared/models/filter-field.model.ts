export type FilterFieldType = 'text' | 'date' | 'select';

export interface FilterOption<T = any> {
  label: string;
  value: T;
}

export interface FilterField<TValue = any> {
  key: string;          // ej: "codigo", "zona"
  label: string;        // ej: "Código Solicitud"
  type: FilterFieldType;
  placeholder?: string;
  options?: FilterOption<TValue>[]; // solo para select
}