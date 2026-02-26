import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoViewPage } from './catalogo-view.page';

describe('CatalogoViewPage', () => {
  let component: CatalogoViewPage;
  let fixture: ComponentFixture<CatalogoViewPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoViewPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
