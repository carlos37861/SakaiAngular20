import { Component, effect, signal, viewChild, untracked, inject } from '@angular/core';

import { FiltedCard } from '@/shared/components/filted-card/filted-card';
import { TableGeneral } from '@/shared/components/table-general/table-general';

import { FilterField } from '@/shared/models/filter-field.model';
import { TableColumn } from '@/shared/models/table-column.model';
import { TableAction } from '@/shared/models/table-action.model';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

// ✅ service

import { SolicitudItem } from '@/features/solicitud-emr/interfaces/solicitudemr_item.interface';
import { SolicitudFilter, SolicitudService } from '@/features/solicitud-emr/services/solicitud-emr.service';

@Component({
  standalone: true,
  imports: [FiltedCard, TableGeneral, ButtonModule, CardModule],
  templateUrl: './solicitud-emr-list.page.html'
})
export class SolicitudEmrListPage {
  private solicitudService = inject(SolicitudService);

  filterCard = viewChild(FiltedCard);
  table = viewChild(TableGeneral);

  // --- data ---
  rows = signal<any[]>([]);
  filtrosActuales = signal<any>({});

  // --- config filtros ---
  filtersConfig = signal<FilterField[]>([
    { key: 'codigo', label: 'Código Solicitud', type: 'text' },
    { key: 'zona', label: 'Zona', type: 'text' },
    { key: 'desde', label: 'Desde', type: 'date' },
    { key: 'hasta', label: 'Hasta', type: 'date' },
    {
      key: 'estado',
      label: 'Estado',
      type: 'select',
      options: [
        { label: 'Todos', value: null },
        { label: 'Activo', value: 'A' },
        { label: 'Anulado', value: 'N' }
      ]
    }
  ]);

// --- config tabla ---
tableColumns = signal<TableColumn[]>([
  { field: 'codigoSolicitud', header: 'Código Solicitud' },
  { field: 'solicitante', header: 'Solicitante' },
  { field: 'estado', header: 'Estado' },
  { field: 'fechaSolicitud', header: 'Fecha Solicitud' },
  { field: 'zona', header: 'Zona' },
  { field: 'labor', header: 'Labor' },
  { field: 'numeroTaladro', header: 'N° Taladro' },
  { field: 'numeroMaquina', header: 'N° Máquina' },
  { field: 'desmonteMineral', header: 'Desmonte/Mineral' },
  { field: 'longitudPerforacion', header: 'Long. Perforación' },
  { field: 'tipoDisparo', header: 'Tipo Disparo' },
  { field: 'turno', header: 'Turno' },
  { field: 'piesPerforados', header: 'Pies Perforados' },
  { field: 'observacion', header: 'Observación' }
]);

  tableActions = signal<TableAction[]>([
    { icon: 'pi pi-eye', tooltip: 'Ver', onClick: row => this.ver(row) },
    { icon: 'pi pi-pencil', tooltip: 'Editar', onClick: row => this.editar(row) },
    {
      icon: 'pi pi-trash',
      tooltip: 'Eliminar',
      colorClass: 'p-button-danger',
      onClick: row => this.eliminar(row)
    }
  ]);

  constructor() {
    effect(() => {
      const card = this.filterCard();
      if (!card) return;
      card.fields.set(this.filtersConfig());
    });

    effect(() => {
      const card = this.filterCard();
      if (!card) return;
      this.filtrosActuales.set(card.filtersChange());
    });

    effect(() => {
      const card = this.filterCard();
      if (!card) return;

      card.searchClick();
      const filtros = untracked(() => this.filtrosActuales());
      this.buscar(filtros);
    });

    effect(() => {
      const table = this.table();
      if (!table) return;

      table.columns.set(this.tableColumns());
      table.actions.set(this.tableActions());
      table.data.set(this.rows());
    });
  }

  // ✅ ahora consume el service
  buscar(filtros: any) {
    console.log('Buscando con:', filtros);

    // 🔁 map UI -> service filters
    const serviceFilters: SolicitudFilter = {
      // tu filtro en UI es "codigo", en el service es "codigoSolicitud"
      codigoSolicitud: (filtros?.codigo ?? '').trim() || undefined,

      // si tu mock no filtra por zona aún, igual lo puedes mandar (o lo filtras aquí)
      // yo lo filtro aquí para que funcione con el mock:
      // (si después tu API soporta "zona", lo pasas al backend)
      // @ts-ignore (por si SolicitudFilter aún no tiene "zona")
      zona: (filtros?.zona ?? '').trim() || undefined,

      // tu UI usa A/N, tu mock tiene "Pendiente/Aprobado"
      // por ahora mapeo A->Aprobado, N->Pendiente (ajústalo a tu negocio real)
      estado:
        filtros?.estado === 'A'
          ? 'Aprobado'
          : filtros?.estado === 'N'
            ? 'Pendiente'
            : undefined
    };

    this.solicitudService.getAll(serviceFilters).subscribe(resp => {
      if (!resp?.IsSuccess) {
        console.error(resp?.ErrorMessage);
        this.rows.set([]);
        return;
      }

      let data: SolicitudItem[] = resp.Result ?? [];

      // ✅ filtro por zona local (mientras el service no lo haga)
      const zona = (filtros?.zona ?? '').trim().toLowerCase();
      if (zona) {
        data = data.filter(x => (x.zona ?? '').toLowerCase().includes(zona));
      }

      // ✅ filtro por rango de fecha local (desde/hasta)
      const desde = filtros?.desde ? new Date(filtros.desde) : null;
      const hasta = filtros?.hasta ? new Date(filtros.hasta) : null;

      if (desde || hasta) {
        data = data.filter(x => {
          const fx = x.fechaSolicitud ? new Date(x.fechaSolicitud as any) : null;
          if (!fx) return false;

          const okDesde = !desde || fx >= desde;
          const okHasta = !hasta || fx <= hasta;
          return okDesde && okHasta;
        });
      }

      // ✅ adaptar a los campos que tu tabla espera (codigo/zona)
      this.rows.set(
        data.map(x => ({
          ...x,
          codigo: x.codigoSolicitud
        }))
      );
    });
  }

  abrirCrearSolicitud() {
    console.log('Crear Solicitud');
  }

  exportarExcel() {
    console.log('Exportar Excel');
  }

  ver(row: any) {
    console.log('Ver', row);
  }

  editar(row: any) {
    console.log('Editar', row);
  }

  eliminar(row: any) {
    console.log('Eliminar', row);
  }
}