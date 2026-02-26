import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoteCreateEmrsPage } from './lote-create-emrs.page';

describe('LoteCreateEmrsPage', () => {
  let component: LoteCreateEmrsPage;
  let fixture: ComponentFixture<LoteCreateEmrsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoteCreateEmrsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoteCreateEmrsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
