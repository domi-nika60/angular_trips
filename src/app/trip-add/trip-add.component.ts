import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Trip } from '../trip';
import { TripServiceService } from '../trip-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../review.service';
import { Trip2 } from '../trip2';


@Component({
  selector: 'app-trip-add',
  templateUrl: './trip-add.component.html',
  styleUrls: ['./trip-add.component.css']
})
export class TripAddComponent implements OnInit {
  
  tripUpdate: Trip2;
  updating: boolean = false;
  updating_id: string;

  newTripForm = new FormGroup({
    name: new FormControl('',Validators.required),
    destination: new FormControl('',Validators.required),
    start_date: new FormControl('', Validators.required),
    end_date: new FormControl('', Validators.required),
    price: new FormControl('',Validators.required),
    // availableSeats: FormControl;
    maxSeats: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    link: new FormControl('', Validators.required)
    // rate: FormControl;
  });

  constructor(
    private tripService: TripServiceService, 
    private formBuilder: FormBuilder,
    private router: Router,
    private revSer: ReviewService,
    private activeR: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.activeR.paramMap.subscribe(par => {
      if (par.has("id")) {
        this.updating = true;
        this.updating_id = par.get("id");
        this.tripService.getTrip(par.get("id")).subscribe(result => {
          this.tripUpdate = { ...result };
          delete result.id;
          delete result.rate;
          delete result.availableSeats;
          
          this.newTripForm.setValue(result);
          // console.log("UPDATING:", result, this.newTripForm);
        });
      }
    });
  }

  onSubmit(newTripForm: FormGroup) {
    if (this.newTripForm.valid && !this.updating) {
      // console.log("New Trip Submitted!");
      // console.log(this.newTripForm.value);
      let trip: Trip2;
      trip = this.newTripForm.value;
      trip.rate = 0;
      trip.availableSeats = trip.maxSeats;
      let tripId = this.tripService.addTrip(newTripForm.value);
      this.revSer.createReview(tripId);
    } else {
      let trip: Trip2 = this.newTripForm.value;;
      // console.log("Updating on submit: ", trip,  this.tripUpdate, this.updating_id  );
      trip.id = this.updating_id;
      trip.rate = this.tripUpdate.rate;
      trip.availableSeats = this.tripUpdate.availableSeats;
      this.tripService.modifyTrip(trip).then(() => {
        this.router.navigate(["trips"]);
      });
    }
  }
}
