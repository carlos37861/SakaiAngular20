import { ApiResponse } from '@/shared/models/api-response.model';
import { CatalogoItem } from '@/features/catalogo/interfaces/catalogo-item.interface';

export const CatalogoMockResponse: ApiResponse<CatalogoItem[]> = {
    IsSuccess: true,
    Result: [
        { codigo: 'CAT2025000004', descripcion: 'Carmex 2.10 mtrs.', unidad: 'Und.', tipo: 'Accesorio' },
        { codigo: 'CAT2025000003', descripcion: 'Emulnor 1000 1” x 7”', unidad: 'Und.', tipo: 'Explosivo' },
        { codigo: 'CAT2025000002', descripcion: 'Emulnor 3000 1” x 7”', unidad: 'Und.', tipo: 'Explosivo' },
        { codigo: 'CAT2025000001', descripcion: 'Mecha Rápida', unidad: 'Kg.', tipo: 'Accesorio' },
    ],
    ErrorMessage: null,
    TotalPages: 0,
    DisplayMessage: '',
    RepeatOption: false,
    MethodToRepeat: null
};