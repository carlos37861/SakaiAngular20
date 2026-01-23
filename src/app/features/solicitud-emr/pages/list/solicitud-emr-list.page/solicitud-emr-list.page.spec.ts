import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudEmrListPage } from './solicitud-emr-list.page';

describe('SolicitudEmrListPage', () => {
  let component: SolicitudEmrListPage;
  let fixture: ComponentFixture<SolicitudEmrListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudEmrListPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudEmrListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
