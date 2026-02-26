import { ApiResponse } from '@/shared/models/api-response.model';
import { StockItem } from '@/features/stock/interfaces/stock-item.interface';

export const StockMockResponse: ApiResponse<StockItem[]> = {
  IsSuccess: true,
  Result: [
    {
      codigo: 'CAT2025000004',
      descripcion: 'Carmex 2.10 mtrs.',
      unidad: 'Und.',
      tipo:'Accesorio',
      stockActual: 25,
      stockMinimo: 25,
    },
    {
      codigo: 'CAT2025000003',
      descripcion: 'Emulnor 1000 1” x 7”',
      unidad: 'Und.',
      tipo:'Explosivo',
      stockActual: 30,
      stockMinimo: 20,
    },
    {
      codigo: 'CAT2025000002',
      descripcion: 'Emulnor 3000 1” x 7”',
      unidad: 'Und.',
      tipo:'Explosivo',
      stockActual: 40,
      stockMinimo: 50,
    },
    {
      codigo: 'CAT2025000001',
      descripcion: 'Mecha Rápida',
      unidad: 'Und.',
      tipo:'Accesorio',
      stockActual: 50,
      stockMinimo: 50,
    }
  ],
  ErrorMessage: null,
  TotalPages: 0,
  DisplayMessage: '',
  RepeatOption: false,
  MethodToRepeat: null
};