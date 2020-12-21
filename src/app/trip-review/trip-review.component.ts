import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BasketService } from '../basket.service';
import { ReviewClass } from '../review-class';
import { Review } from '../review';
import { ReviewService } from '../review.service';
import { Trip2 } from '../trip2';

@Component({
  selector: 'app-trip-review',
  templateUrl: './trip-review.component.html',
  styleUrls: ['./trip-review.component.css']
})
export class TripReviewComponent implements OnInit {

  @Input()
  tripId: string;

  @Input()
  trip: Trip2;

  allReviews: ReviewClass[];
  comments: string[];
  meanTripRate: number;
  tempTrip = Trip2;
  newReview: ReviewClass = {id: "", tripId: "", comment: [], rate: [] };
  currRevieId: string;
  currComments: string[];
  currRates: number[];
  canMakeReview: boolean;

  newCommentForm: FormGroup;
  comment: FormControl;
  number: FormControl;

  constructor(
    public revSer: ReviewService, 
    private route: ActivatedRoute, 
    public reviewService: ReviewService, 
    private formBuilder: FormBuilder,
    public basketService: BasketService
    ) { }

  ngOnInit(): void {
    this.loadReviewsToMemory();
    this.createForm();
    this.haveThisInBasket();
  }

  loadReviewsToMemory(): void {
    // console.log("loadTripsToMemory", this.revSer);
    this.revSer.getReviews().subscribe(rev => {
      this.allReviews = rev;
    });
  }

  createForm() {
    this.newCommentForm = this.formBuilder.group({
      comment: "",
      rate: ""
    });
  }

  onSubmit() {
    for (let data of this.allReviews ) {
      if (data?.tripId === this.tripId){
        this.currRevieId = data?.id;
        this.currComments = data?.comment;
        this.currRates = data?.rate;
      }
      // console.log("reviewId", this.currRevieId, this.currComments, this.currRates);
    }
    if (this.newCommentForm.valid) {
      let new_rate: string = (this.newCommentForm.value.rate).toString();
      this.currComments.push(this.newCommentForm.value.comment);
      this.currRates.push((this.newCommentForm.value.rate).toString());
      
      this.newReview.tripId = this.tripId;
      this.newReview.id = this.currRevieId;
      this.newReview.comment = this.currComments;
      this.newReview.rate = this.currRates;
      console.log("New Comment Submitted!",this.newReview);
      this.revSer.updateTripReview(this.newReview);
    }
  }

  haveThisInBasket() {
    this.canMakeReview = this.basketService.isTripInBasekt(this.trip);
  }
}

