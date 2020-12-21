import { Injectable } from '@angular/core';
import { Basket } from './basket';
import { BasketClass } from './basketClass';
import { Trip2 } from './trip2';
import{TripServiceService} from './trip-service.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  bTrips: Trip2[] = [];
  
  basketRef: AngularFirestoreCollection<Basket> = null;
  bBasket: BasketClass[] = [];
  newBasketElement: BasketClass;
  currUser: string;

  constructor(private http: HttpClient, public afs:AngularFirestore, private auth:AuthenticationService, private tripSer: TripServiceService)  {
    this.basketRef = this.afs.collection("basket/");
  }

  loadBasket(): BasketClass[] {
    this.auth.getUser().then(user => { 
      this.currUser = user.uid;
    })
    let tempBasketItems: BasketClass[] = [];
    let result = this.afs.collection("basket").valueChanges({idField: 'basketId'}).subscribe((bBasket:any) => {
      
      for (const data of bBasket){
        if (this.currUser === data.userId){
          tempBasketItems.push(new BasketClass(data.basketId, data.tripId, data.amount, data.userId));
        }
      }
      this.bBasket = tempBasketItems;
    });
    return tempBasketItems;
  }

  addTripToBasket2(chosenTrip: Trip2): void {
      // console.log("addTripToBasket ",  chosenTrip, "bBasket w addowaniu ",  this.bBasket);
      for (const elem of this.bBasket){
        // console.log("Wyliczam elemnty w baskecie: ", elem, chosenTrip.id, elem.tripId);
        if (chosenTrip.id === elem.tripId){
          let reserved_seats = elem.amount;
          this.newBasketElement = new BasketClass(elem.id, chosenTrip.id, reserved_seats+1, this.currUser);
          // console.log("zmodyfikowany element!", this.newBasketElement, "miejsc wczesniej:",reserved_seats );
          this.afs.collection("basket").doc(elem.id).set({...this.newBasketElement}, {
            merge: true
          });
          this.updateBasket(this.newBasketElement);
          return;
        } 
      }
      this.newBasketElement = new BasketClass(0, chosenTrip.id, 1, this.currUser);
      // console.log('Wyglada tak: ', this.newBasketElement);
      this.bBasket.push(this.newBasketElement);
      this.afs.collection("basket").add({...this.newBasketElement}).then(x=>{
        x.set(
        { id: x.id }, 
        { merge: true }
        )
      });
      this.updateBasket(this.newBasketElement);
      return;
  }

  removeTripFromBasket(chosenTrip: Trip2): void {
    this.bTrips.push(chosenTrip);
    // console.log("removeTripFromBasket",  chosenTrip);
    for (const elem of this.bBasket){
      if (chosenTrip.id === elem.tripId){
        let amout_reserved = elem.amount;
        if (amout_reserved >= 2){
          this.newBasketElement = new BasketClass(elem.id, chosenTrip.id, amout_reserved-1, this.currUser);
          this.afs.collection("basket").doc(elem.id).set({...this.newBasketElement}, {
            merge: true
          });
          this.updateBasket(this.newBasketElement);
          return;
        } else if  (amout_reserved == 1) {
          console.log("DELETING instance of trip from basket");
          this.afs.collection("basket").doc(elem.id).delete();
          return;
        }
      }
    }
  }

  isTripInBasekt(trip: Trip2): boolean{
    this.auth.getUser().then(user => { 
      this.currUser = user.uid;
    })
    this.bTrips.push(trip);
    for (const elem of this.bBasket){
      if (trip.id === elem.tripId && this.currUser === elem.userId){
        // console.log("USER MA TEN TRIP W BASKECIE")
        return true;
      }
    }
    return false;    
  }

  SumBasketTripsTypes() {
    return this.bBasket.length;
  }

  SumBasketAllTrips() {
    let i;
    let tripsAmount: number =0;
    for (i=0; i<this.bBasket.length; i++){
      tripsAmount += this.bBasket[i].amount;
    }
    return tripsAmount;
  }

  getBasket(): Observable<BasketClass> {
    return this.afs.collection("basket").doc<BasketClass>().get().pipe(map(d => d.data()));
  }

  getBaskatss(): Observable<BasketClass[]>  {
    return this.basketRef.valueChanges();
  }

  updateBasket(basket: BasketClass): Promise<any>{
    return this.afs.collection("basket").doc<BasketClass>(basket.id).update(basket);
  }

}