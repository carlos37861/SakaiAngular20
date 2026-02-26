export type FormFieldType = 'text' | 'select' | 'date' | 'number' | 'textarea';

export interface FormField {
  key: string;
  label: string;
  type: FormFieldType;

  placeholder?: string;
  required?: boolean;
  disabled?: boolean;

  // select
  options?: { label: string; value: any }[];
}