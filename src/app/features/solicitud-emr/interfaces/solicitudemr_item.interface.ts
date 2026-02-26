export interface SolicitudItem {
  codigoSolicitud: string;
  solicitante: string;
  estado: string;
  fechaSolicitud: Date | string;
  zona: string;
  labor: string;
  numeroTaladro: string;
  numeroMaquina: string;
  desmonteMineral: string;
  longitudPerforacion: number;
  tipoDisparo: string;
  turno: string;
  piesPerforados: number;
  observacion: string;
}