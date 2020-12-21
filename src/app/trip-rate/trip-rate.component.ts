import{ Component, EventEmitter, Input, OnInit, Output  } from '@angular/core';
// import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-trip-rate',
  templateUrl: './trip-rate.component.html',
  styleUrls: ['./trip-rate.component.css']
})
export class TripRateComponent implements OnInit {

  @Input() 
  value2: number;

  @Output()
  rateTripEvent = new EventEmitter<number>();

  arrya = new Array(5);
  constructor() { }

  ngOnInit(): void {
  }

rateTrip(value: number){
  this.value2 = value +1;
  this.rateTripEvent.emit(this.value2);
}

starsSelected(index: number) {
  return index < this.value2;
}

}
