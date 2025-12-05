import { Directive, HostListener } from "@angular/core";

@Directive({
  selector: '[dni]'
})
export class DniDirective {

  @HostListener('input', ['$event'])
  onInput(event: any) {
    let value = event.target.value;

    // Elimina caracteres no numéricos
    value = value.replace(/[^0-9]/g, '');

    // Recorta a 8 dígitos
    if (value.length > 8) {
      value = value.slice(0, 8);
    }

    event.target.value = value;
  }
}