import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripFilterComponent } from './trip-filter.component';

describe('TripFilterComponent', () => {
  let component: TripFilterComponent;
  let fixture: ComponentFixture<TripFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
