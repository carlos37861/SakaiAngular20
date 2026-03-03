import { ApiResponse } from '@/shared/models/api-response.model';
import { SolicitudEmrHeader } from '@/features/solicitud-emr/interfaces/solicitudemr_item.interface';

export const SOLICITUD_ITEM_LIST_MOCK: SolicitudEmrHeader[] = [
  {
    codigoSolicitud: 'SOL2025000146',
    solicitante: 'Juan Pérez',
    estado: 'Pendiente',
    fechaSolicitud: '01/05/2024',
    zona: 'Zona Norte',
    labor: 'Labor 102',
    nroTaladro: 'T-45',
    nroMaquina: 'M-12',
    desmonteMineral: 'Mineral',
    longPerforacion: 120,
    tipoDisparo: 'Primario',
    turno: 'Noche',
    piesPerforados: 350,
    observacion: 'Solicitud generada para perforación programada.'
  },
  {
    codigoSolicitud: 'SOL2025000147',
    solicitante: 'Carlos Ramos',
    estado: 'Aprobado',
    fechaSolicitud: '01/05/2024',
    zona: 'Zona Sur',
    labor: 'Labor 210',
    nroTaladro: 'T-22',
    nroMaquina: 'M-07',
    desmonteMineral: 'Desmonte',
    longPerforacion: 95,
    tipoDisparo: 'Secundario',
    turno: 'Día',
    piesPerforados: 280,
    observacion: 'Solicitud aprobada para ejecución inmediata.'
  }
];

export const SolicitudMockListResponse: ApiResponse<SolicitudEmrHeader[]> = {
    IsSuccess: true,
    Result: SOLICITUD_ITEM_LIST_MOCK,
    ErrorMessage: null,
    TotalPages: 0,
    DisplayMessage: '',
    RepeatOption: false,
    MethodToRepeat: null
};

export const SolicitudMockResponse: ApiResponse<SolicitudEmrHeader> = {
    IsSuccess: true,
    Result: SOLICITUD_ITEM_LIST_MOCK[0],
    ErrorMessage: null,
    TotalPages: 0,
    DisplayMessage: '',
    RepeatOption: false,
    MethodToRepeat: null
};