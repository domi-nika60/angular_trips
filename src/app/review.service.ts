import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import { TripServiceService } from './trip-service.service';
import { ReviewClass } from './review-class';
import { AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  reviewRef: AngularFirestoreCollection<ReviewClass> = null;
  reviewId: string;


  constructor(private http: HttpClient, private db: AngularFirestore, private auth: AuthenticationService, private tripSer: TripServiceService) {
    this.reviewRef = this.db.collection("reviews/");
   }

  getReview(tripId: string): Observable<ReviewClass> {
    return this.db.collection("reviews/").doc<ReviewClass>(tripId).get().pipe(map(d => d.data()));
  }

  getReview2(): Observable<ReviewClass> {
    return this.db.collection("reviews/").doc<ReviewClass>().get().pipe(map(d => d.data()));
  }

  getReviews(): Observable<ReviewClass[]> {
    // console.log("getReviews",  this.reviewRef);
    return this.reviewRef.valueChanges();
  }

  createReview(tripid: string) {
    let comments: [];
    let rates: [];
    let newRev = new ReviewClass(0, tripid, [""], [""]);
    // console.log("Adding Review: ", newRev);
    this.db.collection("reviews").add({...newRev}).then(x=>{
      x.set(
        { id: x.id, tripId: x.id }, 
        { merge: true }
        )
      // console.log("NEW REVIWE", x);
    });
  }

  updateTripReview(review: ReviewClass): Promise<any> {
    // console.log("Updating review id : ", review);
    this.calculateTripRate(review);
    return this.db.collection("reviews/").doc<ReviewClass>(review.id).update(review);
  }

  private calculateTripRate(tripReview: ReviewClass) {
      let sum = 0;
      for (let elem of tripReview.rate) {
        sum += Number(elem);
      }
      let meanRate = Math.round(sum / tripReview.rate.length);
      // console.log("Calculation of rating: ", sum, tripReview.rate.length, meanRate );
      this.tripSer.getTrip(tripReview.tripId).subscribe(trip => {
        trip.rate = meanRate;
        this.tripSer.modifyTrip(trip).then();
      })
      return this.tripSer.getTrip(tripReview.tripId);
  }
}


