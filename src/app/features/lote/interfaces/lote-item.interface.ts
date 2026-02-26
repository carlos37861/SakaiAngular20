export interface LoteDetalleItem {
  codigo: string;
  descripcion: string;
  tipo: string;
}

export interface LoteItem {
  codigo: string;
  descripcion: string;
  fechaProduccion: string;
  fechaVencimiento: string;
  cantidadTotal: number;
  unidad: string;
  pesoNeto: number;
  estado: string;

  // 🔥 hijos
  emrs: LoteDetalleItem[];
}