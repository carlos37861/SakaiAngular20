import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return '';

    const fecha = new Date(value);
    return fecha.toLocaleDateString('es-PE'); // dd/mm/yyyy
  }
}