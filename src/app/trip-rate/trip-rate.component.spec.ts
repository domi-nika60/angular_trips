import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripRateComponent } from './trip-rate.component';

describe('TripRateComponent', () => {
  let component: TripRateComponent;
  let fixture: ComponentFixture<TripRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
