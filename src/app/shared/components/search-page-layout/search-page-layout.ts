import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-page-layout',
  imports: [],
  templateUrl: './search-page-layout.html',
  styleUrl: './search-page-layout.scss'
})
export class SearchPageLayout {
  @Input() title = 'ga';
  @Input() subtitle = 'gaf';          // opcional
  @Input() resultTitle = 'Resultado de Búsqueda';
}
