import { Injectable, inject } from '@angular/core';


import { delay, Observable, of } from 'rxjs';
import { HttpService } from '@/core/services/https/http.service';
import { Persona } from '@/shared/models/persona.model';
import { ApiEndpointsService } from '@/core/services/https/api-endpoints.service';
import { ApiResponse } from '@/shared/models/api-response.model';
import { PersonasMockResponse } from '@/core/services/mocks/personas.mock';

@Injectable({ providedIn: 'root' })
export class PersonasService {

    private http = inject(HttpService);
    private endpoints = inject(ApiEndpointsService);


      // GET MOCK: listado con filtros
        getAll(): Observable<ApiResponse<Persona[]>> {
        return of(PersonasMockResponse).pipe(
            delay(400)
        );
        }
//     getAll(): Observable<ApiResponse<Persona[]>> {
//     return this.http.get<ApiResponse<Persona[]>>(this.endpoints.personas.base);
//   }

  getById(id: number): Observable<ApiResponse<Persona>> {
    return this.http.get<ApiResponse<Persona>>(
      `${this.endpoints.personas.base}/${id}`
    );
  }

  create(body: Persona): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      this.endpoints.personas.base,
      body
    );
  }

  update(id: number, body: Persona): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(
      `${this.endpoints.personas.base}/${id}`,
      body
    );
  }

  delete(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(
      `${this.endpoints.personas.base}/${id}`
    );
  }
}