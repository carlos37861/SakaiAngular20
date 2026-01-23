import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPageLayout } from './search-page-layout';

describe('SearchPageLayout', () => {
  let component: SearchPageLayout;
  let fixture: ComponentFixture<SearchPageLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPageLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPageLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
