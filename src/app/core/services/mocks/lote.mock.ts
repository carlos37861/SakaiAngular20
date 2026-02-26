import { ApiResponse } from '@/shared/models/api-response.model';
import { LoteItem } from '@/features/lote/interfaces/lote-item.interface';

export const LoteMockResponse: ApiResponse<LoteItem[]> = {
  IsSuccess: true,
  Result: [
    {
      codigo: '25375',
      descripcion: 'Emulnor 3000 1” x 7”',
      fechaProduccion: '12/09/25',
      fechaVencimiento: '12/09/26',
      cantidadTotal: 260,
      unidad: 'UND.',
      pesoNeto: 25,
      estado: 'Próximo a vencer',
      emrs: [
        {
          codigo: 'EMR2025000001',
          descripcion: 'Emulnor 3000 1X7”',
          tipo: 'Explosivo'
        },
        {
          codigo: 'EMR2025000002',
          descripcion: 'Emulnor 3000 1X7”',
          tipo: 'Explosivo'
        }
      ]
    },
    {
      codigo: '25423',
      descripcion: 'Mecha Rápida Z-18 (150m)',
      fechaProduccion: '15/10/25',
      fechaVencimiento: '12/10/28',
      cantidadTotal: 1500,
      unidad: 'Mtrs.',
      pesoNeto: 10.5,
      estado: 'Disponible',
      emrs: [
        {
          codigo: 'EMR2025000152',
          descripcion: 'Mecha Rápida',
          tipo: 'Accesorio'
        },
        {
          codigo: 'EMR2025000153',
          descripcion: 'Mecha Rápida',
          tipo: 'Accesorio'
        }
      ]
    },
        {
      codigo: '25426',
      descripcion: 'Mecha Rápida Z-18 (150m)',
      fechaProduccion: '15/10/25',
      fechaVencimiento: '12/10/28',
      cantidadTotal: 1400,
      unidad: 'Mtrs.',
      pesoNeto: 10.5,
      estado: 'Vencido',
      emrs: [
        {
          codigo: 'EMR2025000152',
          descripcion: 'Mecha Rápida',
          tipo: 'Accesorio'
        },
        {
          codigo: 'EMR2025000153',
          descripcion: 'Mecha Rápida',
          tipo: 'Accesorio'
        },
                {
          codigo: 'EMR2025000154',
          descripcion: 'Mecha Rápida 2',
          tipo: 'Accesorio'
        }
      ]
    }
  ],
  ErrorMessage: null,
  TotalPages: 0,
  DisplayMessage: '',
  RepeatOption: false,
  MethodToRepeat: null
};