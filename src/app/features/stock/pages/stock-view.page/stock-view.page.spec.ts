import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockViewPage } from './stock-view.page';

describe('StockViewPage', () => {
  let component: StockViewPage;
  let fixture: ComponentFixture<StockViewPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockViewPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
