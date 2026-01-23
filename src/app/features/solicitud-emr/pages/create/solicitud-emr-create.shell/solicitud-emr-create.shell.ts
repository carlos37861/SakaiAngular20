import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

import { ButtonModule } from 'primeng/button';

import { SolicitudEmrWizardStateService } from '@/features/solicitud-emr/services/solicitud-emr-wizard-state.service';

@Component({
  standalone: true,
  selector: 'app-solicitud-emr-create-shell',
  imports: [CommonModule, RouterOutlet, ButtonModule],
  templateUrl: './solicitud-emr-create.shell.html',
  styleUrl: './solicitud-emr-create.shell.scss',
})
export class SolicitudEmrCreateShell {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  state = inject(SolicitudEmrWizardStateService);

  activeIndex = 0; // 0 paso-1, 1 paso-2

  constructor() {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        const url = this.router.url;
        this.activeIndex = url.includes('paso-2') ? 1 : 0;
      });
  }

  get canGoBack() { return this.activeIndex > 0; }
  get isLastStep() { return this.activeIndex === 1; }

  get canGoNext() {
    return this.activeIndex === 0 ? this.state.infoForm.valid : false;
  }

  get canSave() {
    return this.state.infoForm.valid && this.state.detalleForm.valid;
  }

  back() {
    if (this.activeIndex === 1) {
      this.router.navigate(['../paso-1'], { relativeTo: this.route });
    }
  }

  next() {
    if (this.activeIndex === 0 && this.state.infoForm.valid) {
      this.router.navigate(['../paso-2'], { relativeTo: this.route });
    }
  }

  cancel() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  save() {
    const payload = this.state.buildPayload();
    console.log('payload a enviar:', payload);
    // aquí llamas a tu API
  }
}