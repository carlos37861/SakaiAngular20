export interface TableColumn {
  field: string;        // key del objeto (ej: 'codigo')
  header: string;       // texto de la columna
  width?: string;

  // opcional para render especial
  type?: 'text' | 'chip';
  chip?: {
    severityMap: Record<string, 'success' | 'warn' | 'danger' | 'info'>;
  };
}