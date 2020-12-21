import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Trip2 } from '../trip2';
import { TripServiceService } from '../trip-service.service';
import { BasketService } from '../basket.service';
import { AuthGuard } from '../auth/auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { AuthenticationService } from '../authentication.service';
import { BasketClass } from '../basketClass';
import { Router } from '@angular/router';


@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  
  isAdmin: boolean;
  logged: boolean;
  basket: BasketClass[];
  userID: string;
  canRemoveFromBasket: boolean;

  @Input() 
  trip: Trip2;

  @Input()
  cheapestTrip: boolean;

  @Input()
  mostExpensiveTrip: boolean;
  
  base64Image: any;
  message: string= "Brak dostępnych miejsc!";
  summaryOfTripPrices: number = 0;

  @Output()
  reserveTripEvent = new EventEmitter<number>();

  @Output()
  removeTripEvent = new EventEmitter<Trip2>();

  @Output()
  sumPriceEvent = new EventEmitter<number>();

  constructor(
    public tripService: TripServiceService,
    public basketService: BasketService,
    public authService: AuthenticationService, 
    public authGuard: AuthGuard,
    public adminGuard: AdminGuard,
    private router: Router,
    ){}

  ngOnInit(): void {
    this.authService.getUser().then(user => this.userID = user.uid);
    this.isLoggedIn();
    this.hasAdminRole();
    this.ableToRemoveFormBasket();
    // this.getBasketInTrips();
  }

  //TO DO
  getBasketInTrips(){
    this.basketService.getBaskatss().subscribe(basket => {
      for (let data of basket ){
        if (this.userID === data.userId) {
          this.basket.push(data);
        }
      }
    });
  }

  reserveTrip() {
    this.trip.availableSeats--;
    this.summaryOfTripPrices += this.trip.price;
    // console.log("Reserving Trip in trip: ", this.summaryOfTripPrices );
    this.tripService.modifyTrip(this.trip);
    this.basketService.addTripToBasket2(this.trip);
  }

  unreserveTrip () {
    if (this.trip.availableSeats < this.trip.maxSeats) {
      this.trip.availableSeats++;
      this.summaryOfTripPrices -= this.trip.price;
      this.tripService.modifyTrip(this.trip);
      this.basketService.removeTripFromBasket(this.trip);
    }
  }

  removeTrip(){
    this.removeTripEvent.emit(this.trip);
  }

  handleRatingTripEvent(value: number){
    this.trip.rate = value;
  }

  hasAdminRole() {
    this.adminGuard.canActivate(null, null).subscribe(result => {
      this.isAdmin = result;
    });
  }

  isLoggedIn() {
    this.authGuard.canActivate(null, null).subscribe(result => {
      this.logged = result;
    });
  }

  editTrip(){
    console.log("Want to edit trip");
      this.router.navigate(["/update", this.trip.id]);
  }

  ableToRemoveFormBasket() {
    this.canRemoveFromBasket = this.basketService.isTripInBasekt(this.trip);
  }
}

