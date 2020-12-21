import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TripServiceService } from '../trip-service.service';
import { BasketService } from '../basket.service';
import { UserService } from '../user.service';
import { User } from '../user';
import { AuthenticationService } from '../authentication.service';
import { Credentials } from "../credentials";


@Component({
  selector: 'app-rejestracja',
  templateUrl: './rejestracja.component.html',
  styleUrls: ['./rejestracja.component.css']
})
export class RejestracjaComponent implements OnInit {


  newUserForm: FormGroup;
  username: FormControl;
  email: FormControl;
  password: FormControl;

  constructor( 
    private userService: UserService,
    private router: Router,
    private basketService: BasketService,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.newUserForm = this.formBuilder.group({
      username: "",
      email: "",
      password: "",
      basketTrips: [],
      role: "user"
    });
  }

  onSubmit() {
    let credentials: Credentials;
    credentials = this.newUserForm.value;
    this.authService.register(credentials).then(result => {
      this.userService.addUser({
        id: result.user.uid,
        email: result.user.email,
        username: this.newUserForm.value.username,
        password: this.newUserForm.value.password,
        role: "user",
        basketTrips: []
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));

  }


}
