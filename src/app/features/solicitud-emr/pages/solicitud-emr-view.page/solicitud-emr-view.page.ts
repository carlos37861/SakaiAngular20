import { CommonModule } from '@angular/common';
import { Component, effect, signal, viewChild, untracked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormCard } from '@/shared/components/form-card/form-card';
import { FormField } from '@/shared/models/form-field.model';

import { SolicitudEmrService } from '@/features/solicitud-emr/services/solicitud-emr.service';
import { ApiResponse } from '@/shared/models/api-response.model';

import { TableGeneral } from '@/shared/components/table-general/table-general';
import { TableColumn } from '@/shared/models/table-column.model';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import {
  SolicitudEmrHeader,
  SolicitudEmrDetalle
} from '@/features/solicitud-emr/interfaces/solicitudemr_item.interface';

@Component({
  standalone: true,
  imports: [CommonModule, FormCard, TableGeneral, ButtonModule, CardModule],
  templateUrl: './solicitud-emr-view.page.html',
  styleUrls: ['./solicitud-emr-view.page.scss'],
})
export class SolicitudEmrViewPage {
  formCard = viewChild(FormCard);
  table = viewChild(TableGeneral);

  // ruta: /solicitudemr/ver/:id  (id = codigoSolicitud)
  id = signal<string | null>(null);

  // step
  step = signal<1 | 2>(1);

  // data
  header = signal<SolicitudEmrHeader | null>(null);
  detalle = signal<SolicitudEmrDetalle[]>([]);

  // cache para cuando vuelves atrás
  paso1Cache = signal<any>(null);

  // config del form (readonly)
  formConfig = signal<FormField[]>([
    { key: 'codigoSolicitud', label: 'Código Solicitud', type: 'text', disabled: true },
    { key: 'solicitante', label: 'Solicitante', type: 'text', disabled: true },
    { key: 'estado', label: 'Estado', type: 'text', disabled: true },
    { key: 'fechaSolicitud', label: 'Fecha Solicitud', type: 'text', disabled: true },
    { key: 'zona', label: 'Zona', type: 'text', disabled: true },
    { key: 'labor', label: 'Labor', type: 'text', disabled: true },
    { key: 'nroTaladro', label: 'N° de Taladro', type: 'text', disabled: true },
    { key: 'nroMaquina', label: 'N° de Máquina', type: 'text', disabled: true },
    { key: 'desmonteMineral', label: 'Desmonte/Mineral', type: 'text', disabled: true },
    { key: 'longPerforacion', label: 'Long. Perforación (m)', type: 'number', disabled: true },
    { key: 'tipoDisparo', label: 'Tipo Disparo', type: 'text', disabled: true },
    { key: 'turno', label: 'Turno', type: 'text', disabled: true },
    { key: 'piesPerforados', label: 'Pies perforados (ft)', type: 'number', disabled: true },
    { key: 'observacion', label: 'Observación', type: 'textarea', disabled: true },
  ]);

  // tabla detalle
  tableColumns = signal<TableColumn[]>([
    { field: 'descripcion', header: 'Descripción' },
    { field: 'unidad', header: 'Unid. Medida', width: '140px' },
    { field: 'cantidad', header: 'Cantidad Solicitada', width: '170px' },
  ]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private solicitudService: SolicitudEmrService
  ) {

    // 1) leer param :id
    effect(() => {
      this.route.paramMap.subscribe(pm => {
        this.id.set(pm.get('id'));
      });
    });

    // 2) init FormCard (si existe) + config + readonly + botón principal
effect(() => {
  const card = this.formCard();
  const h = this.header();
  const step = this.step();

  if (!card || !h) return;
  if (step !== 1) return;

  // 1) primero fields (esto recrea el form en el FormCard)
  card.fields.set(this.formConfig());

  // 2) luego inyecta valores en el siguiente microtask
  queueMicrotask(() => {
    const card2 = this.formCard();
    if (!card2) return;

    card2.setValue(h);
    card2.setReadonly(true);

    card2.showPrimary.set(true);
    card2.primaryLabel.set('Siguiente');
  });
});
    // 3) cargar data cuando cambie id
    effect(() => {
      const id = this.id();
      if (!id) return;

      this.cargarHeader(id);
      this.cargarDetalle(id);
    });

    // 4) cancelar desde FormCard
    effect(() => {
      const card = this.formCard();
      if (!card) return;

      if (!card.consumeCancelClick()) return;
      this.volver();
    });

    // 5) siguiente desde FormCard => paso 2
    effect(() => {
      const card = this.formCard();
      if (!card) return;

      if (!card.consumeSaveClick()) return;

      // cachea lo que está en el form (por si algo cambia)
      const raw = untracked(() => card.formGroup.getRawValue());
      this.paso1Cache.set(raw);

      this.step.set(2);
    });

    // 6) configurar tabla
    effect(() => {
      const table = this.table();
      if (!table) return;

      table.columns.set(this.tableColumns());
      table.data.set(this.detalle());

      table.expandable.set(false);
      table.selectable.set(false);

      // si tienes un id real úsalo aquí
      table.dataKey.set('descripcion');
    });
  }

  volver() {
    this.router.navigateByUrl('/solicitudemr');
  }

  cancelar() {
    this.volver();
  }

  atras() {
    this.step.set(1);
    queueMicrotask(() => this.pintarPaso1());
  }

  // ==========================
  // Helpers
  // ==========================
  private pintarPaso1() {
    const card = this.formCard();
    if (!card) return;

    // por seguridad, re-setea config (FormCard reconstruye form)
    card.fields.set(this.formConfig());

    // prioriza cache, si no hay cache usa header
    const data = this.paso1Cache() ?? this.header();
    
    if (data) card.setValue(data);

    card.setReadonly(true);
    card.showPrimary.set(true);
    card.primaryLabel.set('Siguiente');
  }

  private mapHeaderToForm(row: any) {
  return {
    codigoSolicitud: row?.codigoSolicitud ?? row?.CodigoSolicitud ?? row?.codigo ?? row?.CODIGO ?? '',
    solicitante: row?.solicitante ?? row?.Solicitante ?? '',
    estado: row?.estado ?? row?.Estado ?? '',

    fechaSolicitud: row?.fechaSolicitud ?? row?.FechaSolicitud ?? '',
    zona: row?.zona ?? row?.Zona ?? '',
    labor: row?.labor ?? row?.Labor ?? '',

    nroTaladro: row?.nroTaladro ?? row?.NroTaladro ?? '',
    nroMaquina: row?.nroMaquina ?? row?.NroMaquina ?? '',
    desmonteMineral: row?.desmonteMineral ?? row?.DesmonteMineral ?? '',

    longPerforacion: Number(row?.longPerforacion ?? row?.LongPerforacion ?? 0),
    tipoDisparo: row?.tipoDisparo ?? row?.TipoDisparo ?? '',
    turno: row?.turno ?? row?.Turno ?? '',
    piesPerforados: Number(row?.piesPerforados ?? row?.PiesPerforados ?? 0),

    observacion: row?.observacion ?? row?.Observacion ?? '',
  };
}

  // ==========================
  // Carga API
  // ==========================
private cargarHeader(codigoSolicitud: string) {
  this.solicitudService.getByCodigo(codigoSolicitud).subscribe({
    next: (res) => {
      console.log('HEADER RESULT =>', res);
      console.log('HEADER RESULT.Result =>', res?.Result);

      if (!res?.IsSuccess || !res?.Result) {
        this.volver();
        return;
      }

      this.header.set(res.Result); // ✅ nada más
    },
    error: () => this.volver(),
  });
}

  private cargarDetalle(codigoSolicitud: string) {
    this.solicitudService.getDetalleByCodigo(codigoSolicitud).subscribe({
      next: (res: ApiResponse<SolicitudEmrDetalle[]>) => {
        if (!res?.IsSuccess || !Array.isArray(res?.Result)) {
          this.detalle.set([]);
          return;
        }
        this.detalle.set(res.Result);
      },
      error: () => this.detalle.set([]),
    });
  }
}