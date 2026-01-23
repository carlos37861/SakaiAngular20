import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudEmrCreateShell } from './solicitud-emr-create.shell';

describe('SolicitudEmrCreateShell', () => {
  let component: SolicitudEmrCreateShell;
  let fixture: ComponentFixture<SolicitudEmrCreateShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudEmrCreateShell]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudEmrCreateShell);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
