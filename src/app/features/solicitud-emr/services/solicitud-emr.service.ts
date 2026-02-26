import { Injectable, inject } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { HttpService } from '@/core/services/http/http.service';
import { ApiEndpointsService } from '@/core/services/http/api-endpoints.service';

import { ApiResponse } from '@/shared/models/api-response.model';


// ✅ mocks (ajusta la ruta según tu estructura)
import {
  SolicitudMockResponse,
  SolicitudMockListResponse
} from '@/core/services/mocks/solicitudemr.mock';
import { SolicitudItem } from '../interfaces/solicitudemr_item.interface';

export interface SolicitudFilter {
  codigoSolicitud?: string;
  estado?: string;
  solicitante?: string;
}

@Injectable({ providedIn: 'root' })
export class SolicitudService {
  private http = inject(HttpService);
  private endpoints = inject(ApiEndpointsService);

  // ✅ GET MOCK: listado con filtros
  getAll(filters?: SolicitudFilter): Observable<ApiResponse<SolicitudItem[]>> {
    if (!filters) {
      return of(SolicitudMockListResponse).pipe(delay(150));
    }

    const codigo = (filters.codigoSolicitud ?? '').trim().toLowerCase();
    const estado = (filters.estado ?? '').trim().toLowerCase();
    const solicitante = (filters.solicitante ?? '').trim().toLowerCase();

    const filtered = (SolicitudMockListResponse.Result ?? []).filter(item => {
      const matchCodigo =
        !codigo || item.codigoSolicitud.toLowerCase().includes(codigo);

      const matchEstado =
        !estado || item.estado.toLowerCase().includes(estado);

      const matchSolicitante =
        !solicitante ||
        item.solicitante.toLowerCase().includes(solicitante);

      return matchCodigo && matchEstado && matchSolicitante;
    });

    return of({
      ...SolicitudMockListResponse,
      Result: filtered
    }).pipe(delay(400));
  }

  // ✅ GET MOCK: detalle por código (para la pantalla "ver" o "editar")
  getByCodigo(codigoSolicitud: string): Observable<ApiResponse<SolicitudItem>> {
    const item = (SolicitudMockListResponse.Result ?? []).find(
      x => x.codigoSolicitud === codigoSolicitud
    );

    // Si no existe, puedes devolver un error “mockeado”
    if (!item) {
      return of({
        IsSuccess: false,
        Result: null as any,
        ErrorMessage: 'Solicitud no encontrada'
      } as ApiResponse<SolicitudItem>).pipe(delay(200));
    }

    return of({
      ...SolicitudMockResponse,
      Result: item
    }).pipe(delay(250));
  }

  // ✅ MOCK create/update/delete (solo simula respuesta)
  create(body: SolicitudItem): Observable<ApiResponse<any>> {
    return of({
      IsSuccess: true,
      Result: { message: 'Solicitud creada (mock)', body },
      ErrorMessage: null
    } as ApiResponse<any>).pipe(delay(300));
  }

  update(codigoSolicitud: string, body: SolicitudItem): Observable<ApiResponse<any>> {
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
  // ✅ REAL (cuando tengas API)
  // ==========================================================
  // getAll(filters?: SolicitudFilter): Observable<ApiResponse<SolicitudItem[]>> {
  //   return this.http.get<ApiResponse<SolicitudItem[]>>(
  //     this.endpoints.solicitud.base,
  //     filters
  //   );
  // }

  // getByCodigo(codigoSolicitud: string): Observable<ApiResponse<SolicitudItem>> {
  //   return this.http.get<ApiResponse<SolicitudItem>>(
  //     `${this.endpoints.solicitud.base}/${codigoSolicitud}`
  //   );
  // }

  // create(body: SolicitudItem): Observable<ApiResponse<any>> {
  //   return this.http.post<ApiResponse<any>>(this.endpoints.solicitud.base, body);
  // }

  // update(codigoSolicitud: string, body: SolicitudItem): Observable<ApiResponse<any>> {
  //   return this.http.put<ApiResponse<any>>(
  //     `${this.endpoints.solicitud.base}/${codigoSolicitud}`,
  //     body
  //   );
  // }

  // delete(codigoSolicitud: string): Observable<ApiResponse<any>> {
  //   return this.http.delete<ApiResponse<any>>(
  //     `${this.endpoints.solicitud.base}/${codigoSolicitud}`
  //   );
  // }
}