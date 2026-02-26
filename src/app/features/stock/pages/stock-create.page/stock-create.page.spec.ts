import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCreatePage } from './stock-create.page';

describe('StockCreatePage', () => {
  let component: StockCreatePage;
  let fixture: ComponentFixture<StockCreatePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockCreatePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
