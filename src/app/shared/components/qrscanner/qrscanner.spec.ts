import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Qrscanner } from './qrscanner';

describe('Qrscanner', () => {
  let component: Qrscanner;
  let fixture: ComponentFixture<Qrscanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Qrscanner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Qrscanner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
