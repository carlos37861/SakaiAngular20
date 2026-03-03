import { Injectable, inject } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { HttpService } from '@/core/services/http/http.service';
import { ApiEndpointsService } from '@/core/services/http/api-endpoints.service';

import { ApiResponse } from '@/shared/models/api-response.model';

// mocks
import {
  SolicitudMockResponse,
  SolicitudMockListResponse
} from '@/core/services/mocks/solicitudemr.mock';

import { SolicitudEmrHeader, SolicitudEmrDetalle } from '../interfaces/solicitudemr_item.interface';

export interface SolicitudFilter {
  codigoSolicitud?: string;
  estado?: string;
  solicitante?: string;
}

@Injectable({ providedIn: 'root' })
export class SolicitudEmrService {
  private http = inject(HttpService);
  private endpoints = inject(ApiEndpointsService);

  // ==========================================================
  // MOCK
  // ==========================================================

  getAll(filters?: SolicitudFilter): Observable<ApiResponse<SolicitudEmrHeader[]>> {
    const list = (SolicitudMockListResponse?.Result ?? []) as SolicitudEmrHeader[];

    if (!filters) {
      return of({ ...SolicitudMockListResponse, Result: list }).pipe(delay(150));
    }

    const codigo = (filters.codigoSolicitud ?? '').trim().toLowerCase();
    const estado = (filters.estado ?? '').trim().toLowerCase();
    const solicitante = (filters.solicitante ?? '').trim().toLowerCase();

    const filtered = list.filter(item => {
      const matchCodigo =
        !codigo || (item.codigoSolicitud ?? '').toLowerCase().includes(codigo);

      const matchEstado =
        !estado || (item.estado ?? '').toLowerCase().includes(estado);

      const matchSolicitante =
        !solicitante || (item.solicitante ?? '').toLowerCase().includes(solicitante);

      return matchCodigo && matchEstado && matchSolicitante;
    });

    return of({
      ...SolicitudMockListResponse,
      Result: filtered
    }).pipe(delay(400));
  }

  /** ✅ Para tu pantalla "ver" (cabecera) */
  getByCodigo(codigoSolicitud: string): Observable<ApiResponse<SolicitudEmrHeader>> {
    const list = (SolicitudMockListResponse?.Result ?? []) as SolicitudEmrHeader[];

    const item = list.find(x => x.codigoSolicitud === codigoSolicitud);

    if (!item) {
      return of({
        IsSuccess: false,
        Result: null as any,
        ErrorMessage: 'Solicitud no encontrada'
      } as ApiResponse<SolicitudEmrHeader>).pipe(delay(200));
    }

    return of({
      IsSuccess: true,
      Result: item,
      ErrorMessage: null
    } as ApiResponse<SolicitudEmrHeader>).pipe(delay(250));
  }

  /** ✅ Para el paso 2 (detalle de artículos)
   *  Recomendado: que tu mock tenga algo como:
   *  SolicitudMockResponse.Result.detalle = [...]
   */
  getDetalleByCodigo(codigoSolicitud: string): Observable<ApiResponse<SolicitudEmrDetalle[]>> {
    // 1) intenta leer detalle desde el mock “detalle completo”
    const detalle =
      (SolicitudMockResponse as any)?.Result?.detalle ??
      (SolicitudMockResponse as any)?.Result?.items ??
      [];

    // si tu mock tiene varios códigos, filtra aquí por codigoSolicitud
    // ejemplo:
    // const detalle = (SolicitudMockResponse.Result ?? []).find(x => x.codigoSolicitud === codigoSolicitud)?.detalle ?? []

    return of({
      IsSuccess: true,
      Result: detalle as SolicitudEmrDetalle[],
      ErrorMessage: null
    } as ApiResponse<SolicitudEmrDetalle[]>).pipe(delay(250));
  }

  create(body: SolicitudEmrHeader): Observable<ApiResponse<any>> {
    return of({
      IsSuccess: true,
      Result: { message: 'Solicitud creada (mock)', body },
      ErrorMessage: null
    } as ApiResponse<any>).pipe(delay(300));
  }

  update(codigoSolicitud: string, body: SolicitudEmrHeader): Observable<ApiResponse<any>> {
    return of({
      IsSuccess: true,
      Result: { message: 'Solicitud actualizada (mock)', codigoSolicitud, body },
      ErrorMessage: null
    } as ApiResponse<any>).pipe(delay(300));
  }

  delete(codigoSolicitud: string): Observable<ApiResponse<any>> {
    return of({
      IsSuccess: true,
      Result: { message: 'Solicitud eliminada (mock)', codigoSolicitud },
      ErrorMessage: null
    } as ApiResponse<any>).pipe(delay(300));
  }

  // ==========================================================
  // REAL (cuando actives backend)
  // ==========================================================
  // getAll(filters?: SolicitudFilter): Observable<ApiResponse<SolicitudEmrHeader[]>> {
  //   return this.http.get<ApiResponse<SolicitudEmrHeader[]>>(
  //     this.endpoints.solicitud.base,
  //     filters
  //   );
  // }

  // getByCodigo(codigoSolicitud: string): Observable<ApiResponse<SolicitudEmrHeader>> {
  //   return this.http.get<ApiResponse<SolicitudEmrHeader>>(
  //     `${this.endpoints.solicitud.base}/${codigoSolicitud}`
  //   );
  // }

  // getDetalleByCodigo(codigoSolicitud: string): Observable<ApiResponse<SolicitudEmrDetalle[]>> {
  //   return this.http.get<ApiResponse<SolicitudEmrDetalle[]>>(
  //     `${this.endpoints.solicitud.base}/${codigoSolicitud}/detalle`
  //   );
  // }
}