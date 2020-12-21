import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TripServiceService } from '../trip-service.service';
import { Trip2 } from '../trip2';


@Component({
  selector: 'app-trip-filter',
  templateUrl: './trip-filter.component.html',
  styleUrls: ['./trip-filter.component.css']
})

export class TripFilterComponent implements OnInit {

  maxPrice: number = -1;
  minPrice: number = -1;
  actMaxPrice: number;
  actMinPrice: number;
  destOptions: string[] = [];
  choosenDest: string[];
  numberOfDestinations: number;
  actRate: number;

  @Input()
  tripList: Trip2[];

  @Output()
  rateFilterChange = new EventEmitter<number>();


  @Output()
  priceFilterChange = new EventEmitter<number[]>();

  constructor(private tripService: TripServiceService) { }

  ngOnInit(): void {

    this.tripService.getTrips().subscribe(trips => {
      this.tripList = trips;
      this.initializeFilterValues();    
      this.actMinPrice = this.minPrice;
      this.actMaxPrice = this.maxPrice;
      this.actRate = 1;
      this.emitPriceFilter();
    });
  }

  initializeFilterValues() {
    this.tripList.forEach(trip => {
      if (Number(trip.price) > this.maxPrice || this.maxPrice === -1) {
        this.maxPrice = Number(trip.price);
      }
      if (Number(trip.price) < this.minPrice || this.minPrice === -1) {
        this.minPrice = Number(trip.price);
      }
      this.actRate = 1;
    });
  }

  filterByPrice() {
    this.emitPriceFilter();
  }

  filterByRate(value: number) {
    this.rateFilterChange.emit(value);
  }

  private emitPriceFilter() {
    let borderPrices: number[] = [];
    // console.log(this.actMinPrice, borderPrices);
    borderPrices.push(this.actMinPrice as number);
    borderPrices.push(this.actMaxPrice as number);
    this.priceFilterChange.emit(borderPrices);
  }

}
