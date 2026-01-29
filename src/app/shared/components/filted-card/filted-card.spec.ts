import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltedCard } from './filted-card';

describe('FiltedCard', () => {
  let component: FiltedCard;
  let fixture: ComponentFixture<FiltedCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltedCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltedCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
