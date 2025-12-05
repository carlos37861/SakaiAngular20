import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {

  handle(error: any) {
    console.error('HTTP Error:', error);

    // Aquí puedes agregar PrimeNG message o SweetAlert
    // Ejemplo:
    // this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error?.message || 'Ocurrió un error.' });

    alert(error.error?.message || 'Ocurrió un error inesperado.');
  }
}