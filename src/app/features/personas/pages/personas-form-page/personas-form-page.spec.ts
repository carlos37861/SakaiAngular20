import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasFormPage } from './personas-form-page';

describe('PersonasFormPage', () => {
  let component: PersonasFormPage;
  let fixture: ComponentFixture<PersonasFormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonasFormPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonasFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
