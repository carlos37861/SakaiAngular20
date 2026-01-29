export interface TableAction {
  icon: string;               // pi pi-pencil
  tooltip: string;            // Editar
  colorClass?: string;        // css opcional
  onClick: (row: any) => void;
}