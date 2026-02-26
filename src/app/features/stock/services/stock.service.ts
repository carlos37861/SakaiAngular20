import { Injectable, inject } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { HttpService } from '@/core/services/http/http.service';
import { ApiEndpointsService } from '@/core/services/http/api-endpoints.service';

import { ApiResponse } from '@/shared/models/api-response.model';
import { CatalogoItem } from '@/features/catalogo/interfaces/catalogo-item.interface';

import { StockMockResponse } from '@/core/services/mocks/stock.mock';
import { StockFilter } from '../interfaces/stock-filter-interface';
import { calcularEstado } from '@/shared/utils/stock.utils';
import { StockItem } from '../interfaces/stock-item.interface';

@Injectable({ providedIn: 'root' })
export class StockService {
  private http = inject(HttpService);
  private endpoints = inject(ApiEndpointsService);

  // GET MOCK: listado con filtros (incluye código)
getAll(filters?: StockFilter): Observable<ApiResponse<StockItem[]>> {
  const codigo = (filters?.codigo ?? '').trim().toLowerCase();
  const estado = filters?.estado ?? null;

  const filtered = (StockMockResponse.Result ?? [])
    .filter(item => {
      const matchCodigo = !codigo || item.codigo.toLowerCase().includes(codigo);
      return matchCodigo;
    })
    .filter(item => {
      if (!estado || estado === '') return true;
      const est = calcularEstado(item.stockActual, item.stockMinimo);
      return est === estado;
    });

  return of({ ...StockMockResponse, Result: filtered }).pipe(delay(400));
}
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
