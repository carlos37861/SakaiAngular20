import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step2Detalle } from './step-2-detalle';

describe('Step2Detalle', () => {
  let component: Step2Detalle;
  let fixture: ComponentFixture<Step2Detalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step2Detalle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step2Detalle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
