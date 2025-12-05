import { Component, inject, signal } from '@angular/core';
import { resource } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PersonasService } from '../../services/personas.service';
import { TableGeneralComponent } from '@/shared/components/table-general/table-general';
import { personasColumns } from './personas-list-columns';
import { personasFilters } from './personas-list-filter';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-personas-list-page',
  standalone: true,
  imports: [CommonModule, TableGeneralComponent, ButtonModule],
  templateUrl: './personas-list-page.html',
  styleUrls: ['./personas-list-page.scss'],
})
export class PersonasListPage {

  private personasService = inject(PersonasService);

  // TRIGGER OFICIAL PARA RECARGAR
  reloadTrigger = signal(0);

  // RESOURCE CORRECTO (Angular 20)
  personasResource = resource({
    params: () => this.reloadTrigger(),  // 👈 depende del trigger
    loader: async () => {
      return await firstValueFrom(this.personasService.getAll());
    }
  });

  personas = this.personasResource.value;
  isLoading = this.personasResource.isLoading;
  error = this.personasResource.error;

  columns = personasColumns;
  filters = personasFilters;

  reload() {
    this.reloadTrigger.update(v => v + 1); // recarga
  }
}
