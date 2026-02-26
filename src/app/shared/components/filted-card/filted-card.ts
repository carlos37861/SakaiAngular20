import { FilterField } from '@/shared/models/filter-field.model';
import { Component, effect, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-filted-card',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, DatePickerModule, SelectModule, ButtonModule],
  templateUrl: './filted-card.html',
  styleUrl: './filted-card.scss'
})
export class FiltedCard {
  fields = signal<FilterField[]>([]);
  filtersChange = signal<any>({});

  //“eventos” por signal (contador)
  searchClick = signal(0);
  clearClick = signal(0);

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});

    effect(() => {
      const fields = this.fields();
      if (!fields.length) return;

      const group: any = {};
      fields.forEach(f => {
        if (f.type === 'select') {
          group[f.key] = [null];   // para que muestre "Todos"
        } else {
          group[f.key] = [''];     // text/date vacíos
        }
      });

      this.form = this.fb.group(group);

      this.form.valueChanges.subscribe(value => {
        this.filtersChange.set(value);
      });
    });
  }

  onSearch() {
    this.searchClick.update(v => v + 1);
  }

  onClear() {
    this.form.reset();
    this.clearClick.update(v => v + 1);
  }

  get formGroup() {
    return this.form;
  }
}
