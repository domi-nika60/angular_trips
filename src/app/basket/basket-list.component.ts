import { Component, OnInit, Input } from '@angular/core';
import { BasketService } from '../basket.service';
import { TripServiceService } from '../trip-service.service';
import { Trip2 } from '../trip2';
import { Basket } from '../basket';
import { BasketClass } from '../basketClass';
import { from } from 'rxjs';
import { numbers } from '@material/toolbar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-basket-list',
  templateUrl: './basket-list.component.html',
  styleUrls: ['./basket-list.component.css']
})
export class BasketListComponent implements OnInit {

  basket: Basket;
  tripList: Trip2[];
  bBasket: BasketClass[];
  totalPrice: number;

  @Input()
  summReservation: number = this.basketService.SumBasketAllTrips();
  
  @Input()
  sumOfPrice: number = 0;

  constructor(
    public basketService: BasketService, 
    private tripService: TripServiceService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.tripService.getTrips().subscribe(trips => this.tripList = trips);
    this.bBasket =this.basketService.loadBasket();
    console.log("visible trips in basket", this.bBasket);
    this.getTotalPrice();
    // console.log("totalPrice", this.totalPrice);

  }

  getTripById(id: string) {
    return this.tripList.filter(trip => trip.id === id)[0];
  }

  getTotalPrice() {
    for (let basketElem of this.bBasket){
      let trip_Id = basketElem.tripId;
      let tempTrip : Trip2 = this.getTripById(trip_Id);
      this.totalPrice += (basketElem.amount * tempTrip.price);
    }
  }

  buyReserved() {
    this.router.navigate(["trips"]);
  }
  
}
