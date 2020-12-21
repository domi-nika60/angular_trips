import { Component, OnInit, EventEmitter, Input, Output  } from '@angular/core';
import { Trip2 } from '../trip2';
import { TripServiceService } from '../trip-service.service';
import { BasketService } from '../basket.service';
// import { Trips } from '../FakeDane.json';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})

export class TripListComponent implements OnInit {

  tripList: Trip2[];
  summReservation: number = 0;
  sumPrice: number = 0;
  maxPriceFilter: number = 0;
  minPriceFilter: number = 0;
  minTripRate: number = 0;

  priceFilter: number[] = [];
  rateFilter: number = 0;
  destinationFilter: string[] = [];

  constructor(private tripService: TripServiceService, public basketService: BasketService) {}

  ngOnInit(): void {
    this.basketService.loadBasket();
    this.loadTripsToMemory();
  }

  loadTripsToMemory(): void {
    this.tripService.getTrips().subscribe(trips => {
      this.tripList = trips;
    });
  }


  mostExpensiveTrip(trip: Trip2): boolean{
    for (let tr of this.tripList){
      if (trip.price < tr.price){
        return false;
      }
    }
    return true;
  }
 
  cheapestTrip(trip: Trip2): boolean{
    for (let tr of this.tripList){
      if (trip.price > tr.price){
        return false;
      }
    }
    return true;
  }

  handleReservationEvent(value: number) {
    this.summReservation += value;
  }

  handleRemovingTripEvent(trip: Trip2){
    let id = this.tripList.indexOf(trip);
    if (id !== -1) {
      this.tripService.removeTrip(trip.id).then(() => {
        this.tripList.splice(id, 1);
      });
    }
  } 

  handleSummPriceEvent(value: number){
    this.sumPrice += value;
  }

  priceFilterChange(value: number[]) {
    let to = this;
    setTimeout(()=>{
      to.priceFilter = value;
    },2000);
  }

  rateFilterChange(value: number) {
    let to = this;
    setTimeout(()=>{
      to.rateFilter = value;
    },500);
  }
 
}
