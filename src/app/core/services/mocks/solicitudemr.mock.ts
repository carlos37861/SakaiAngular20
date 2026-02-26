import { ApiResponse } from '@/shared/models/api-response.model';
import { SolicitudItem } from '@/features/solicitud-emr/interfaces/solicitudemr_item.interface';

export const SOLICITUD_ITEM_LIST_MOCK: SolicitudItem[] = [
  {
    codigoSolicitud: 'SOL2025000146',
    solicitante: 'Juan Pérez',
    estado: 'Pendiente',
    fechaSolicitud: new Date('2026-02-20'),
    zona: 'Zona Norte',
    labor: 'Labor 102',
    numeroTaladro: 'T-45',
    numeroMaquina: 'M-12',
    desmonteMineral: 'Mineral',
    longitudPerforacion: 120,
    tipoDisparo: 'Primario',
    turno: 'Noche',
    piesPerforados: 350,
    observacion: 'Solicitud generada para perforación programada.'
  },
  {
    codigoSolicitud: 'SOL2025000147',
    solicitante: 'Carlos Ramos',
    estado: 'Aprobado',
    fechaSolicitud: new Date('2026-02-21'),
    zona: 'Zona Sur',
    labor: 'Labor 210',
    numeroTaladro: 'T-22',
    numeroMaquina: 'M-07',
    desmonteMineral: 'Desmonte',
    longitudPerforacion: 95,
    tipoDisparo: 'Secundario',
    turno: 'Día',
    piesPerforados: 280,
    observacion: 'Solicitud aprobada para ejecución inmediata.'
  }
];

export const SolicitudMockListResponse: ApiResponse<SolicitudItem[]> = {
    IsSuccess: true,
    Result: SOLICITUD_ITEM_LIST_MOCK,
    ErrorMessage: null,
    TotalPages: 0,
    DisplayMessage: '',
    RepeatOption: false,
    MethodToRepeat: null
};

export const SolicitudMockResponse: ApiResponse<SolicitudItem> = {
    IsSuccess: true,
    Result: SOLICITUD_ITEM_LIST_MOCK[0],
    ErrorMessage: null,
    TotalPages: 0,
    DisplayMessage: '',
    RepeatOption: false,
    MethodToRepeat: null
};