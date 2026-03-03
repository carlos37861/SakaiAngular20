export interface SolicitudEmrHeader {
  codigoSolicitud: string;
  solicitante: string;
  estado: string;
  fechaSolicitud?: string;
  zona?: string;
  labor?: string;
  nroTaladro?: string;
  nroMaquina?: string;
  desmonteMineral?: string;
  longPerforacion?: number;
  tipoDisparo?: string;
  turno?: string;
  piesPerforados?: number;
  observacion?: string;
}

export interface SolicitudEmrDetalle {
  descripcion: string;
  unidad: string;
  cantidad: number;
}