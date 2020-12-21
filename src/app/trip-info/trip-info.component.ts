import { Component, OnInit } from '@angular/core';
import { Trip2 } from '../trip2';
import { TripServiceService } from '../trip-service.service';
import { ActivatedRoute } from '@angular/router';
import { TripReviewComponent } from '../trip-review/trip-review.component';
import { ReviewClass } from '../review-class';
import { ReviewService } from '../review.service';


@Component({
  selector: 'app-trip-info',
  templateUrl: './trip-info.component.html',
  styleUrls: ['./trip-info.component.css']
})
export class TripInfoComponent implements OnInit {

  trip: Trip2;
  tripId: string;
  reviews: ReviewClass;
  images = [];

  constructor(
    private tripsService: TripServiceService, 
    private route: ActivatedRoute, 
    public reviewService: ReviewService
    ) {}
  

  ngOnInit(): void {
    // console.log("Initializatin of trip details: ", this.tripsService.getTrip(this.tripId));
    this.route.paramMap.subscribe(params => {
      this.tripsService.getTrip(params.get('tripId')).subscribe(trip => {
        // console.log("Trip", trip, "and id: ", trip.id);
        this.trip = trip;
        this.images = [];
      });
    });
  }

}
