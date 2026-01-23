import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step1Info } from './step-1-info';

describe('Step1Info', () => {
  let component: Step1Info;
  let fixture: ComponentFixture<Step1Info>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step1Info]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step1Info);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
