import { Injectable, inject } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { HttpService } from '@/core/services/http/http.service';
import { ApiEndpointsService } from '@/core/services/http/api-endpoints.service';

import { ApiResponse } from '@/shared/models/api-response.model';
import { CatalogoItem } from '@/features/catalogo/interfaces/catalogo-item.interface';
import { CatalogoFilter } from '@/features/catalogo/interfaces/catalogo-filter-interface';

import { CatalogoMockResponse } from '@/core/services/mocks/catalogo.mock';
import { LoteMockResponse } from '@/core/services/mocks/lote.mock';

@Injectable({ providedIn: 'root' })
export class CatalogoService {
  private http = inject(HttpService);
  private endpoints = inject(ApiEndpointsService);

  // ✅ GET MOCK: listado con filtros (incluye código)

    getAll() {
  return of(LoteMockResponse);
}
  // getAll(filters?: CatalogoFilter): Observable<ApiResponse<CatalogoItem[]>> {
  //   // si no mandas filtros, devuelve todo el mock
  //   if (!filters) {
  //     return of(CatalogoMockResponse).pipe(delay(100));
  //   }

  //   const codigo = (filters.codigo ?? '').trim().toLowerCase();
  //   const descripcion = (filters.descripcion ?? '').trim().toLowerCase();
  //   const tipo = filters.tipo ?? null;

  //   const filtered = (CatalogoMockResponse.Result ?? []).filter(item => {
  //     const matchCodigo = !codigo || item.codigo.toLowerCase().includes(codigo);
  //     const matchDescripcion =
  //       !descripcion || item.descripcion.toLowerCase().includes(descripcion);
  //     const matchTipo = tipo === null || tipo === '' || item.tipo === tipo;

  //     return matchCodigo && matchDescripcion && matchTipo;
  //   });

  //   return of({
  //     ...CatalogoMockResponse,
  //     Result: filtered
  //   }).pipe(delay(400));
  // }

  //  REAL (cuando tengas API)
  // getAll(filters?: CatalogoFilter): Observable<ApiResponse<CatalogoItem[]>> {
  //   return this.http.get<ApiResponse<CatalogoItem[]>>(
  //     this.endpoints.catalogo.base,
  //     filters
  //   );
  // }

  getById(codigo: string): Observable<ApiResponse<CatalogoItem>> {
    return this.http.get<ApiResponse<CatalogoItem>>(
      `${this.endpoints.catalogo.base}/${codigo}`
    );
  }

  create(body: CatalogoItem): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      this.endpoints.catalogo.base,
      body
    );
  }

  update(codigo: string, body: CatalogoItem): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(
      `${this.endpoints.catalogo.base}/${codigo}`,
      body
    );
  }

  delete(codigo: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(
      `${this.endpoints.catalogo.base}/${codigo}`
    );
  }
}
