import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoCreatePage } from './catalogo-create.page';

describe('CatalogoCreatePage', () => {
  let component: CatalogoCreatePage;
  let fixture: ComponentFixture<CatalogoCreatePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoCreatePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
