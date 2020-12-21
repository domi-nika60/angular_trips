import { Injectable } from '@angular/core';
import { Trip } from './trip';
import { Trip2 } from './trip2';
import { TRIPS } from './trips_table';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import fakeTrips from './FakeDane.json';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import {AuthenticationService} from './authentication.service';


@Injectable({
  providedIn: 'root'
})

export class TripServiceService {

  trips: Trip2[]=[];
  tempID: string;
  tripsRef: AngularFirestoreCollection<Trip> = null;

  constructor(
    private http: HttpClient, 
    private db:AngularFirestore, 
    private auth:AuthenticationService
  )  { 
    this.loadFireBase();
    this.tripsRef = this.db.collection("trips/");
  }

  loadFireBase(){
    // console.log("In loadFireBase");
    let result = this.db.collection("trips").valueChanges({idField: 'tripId'}).subscribe((trips:any) => {
      let tempTrips: Trip2[] = [];
      // console.log(trips);
      for (const data of trips){
        tempTrips.push(new Trip2(data.tripId, data.name, data.destination, data.start_date, data.end_date, data.price, data.availableSeats, data.maxSeats, data.description, data.link, data.rate));
      }
      this.trips = tempTrips;
    });
  }

  getTrips(): Observable<Trip2[]> {
    // console.log("getTrips",  this.tripsRef);
    return this.tripsRef.valueChanges();
  }

  modifyTrip(modifiedTrip: Trip2): Promise<any> {
    // console.log("MODIFYING ", modifiedTrip)
    return this.db.collection("trips/").doc(modifiedTrip.id).update(modifiedTrip);
  }

  getTrip(tripId: string): Observable<Trip2> {
    return this.db.doc<Trip>("trips/" + tripId).snapshotChanges().pipe(map(changes => {
      const data: Trip = changes.payload.data();
      const id = changes.payload.id;
      return {id, ...data};
    }))
  }
  
  addTrip(data: Trip2): string {
    let new_link = [data.link];
    let newTrip = new Trip2(0, data.name, data.destination, data.start_date, data.end_date, data.price, data.availableSeats, data.maxSeats, data.description, new_link, data.rate);
    // console.log("ADDINGLINK2: ", newTrip);

    this.db.collection("trips").add({...newTrip}).then(x=>{
      x.set(
        { id: x.id }, 
        { merge: true }
        )
      this.tempID = x.id;
    });
    return this.tempID;
  }

  removeTrip(tripId: any): Promise<any> {
    console.log("Deleting trip");
    return this.db.collection("trips").doc(tripId).delete();
  }
 
   saveTrip(trip: Trip2){
     const basketRef: AngularFirestoreDocument<any> = this.db.doc(`trips/${trip.id}`);
      // console.log("Adding to basket!", basketRef, " i ",  trip.id);
     basketRef.set({...trip}, {
       merge: true
     });
   }

}
