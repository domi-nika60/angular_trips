import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TripServiceService } from '../trip-service.service';
import { BasketService } from '../basket.service';
import { UserService } from '../user.service';
import { User } from '../user';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-logowanie',
  templateUrl: './logowanie.component.html',
  styleUrls: ['./logowanie.component.css']
})
export class LogowanieComponent implements OnInit {


  loginForm = new FormGroup(
    {
      email: new FormControl(''),
      password: new FormControl('',Validators.required)
    }
  );

  constructor(
    private userService: UserService,
    private router: Router,
    private basketService: BasketService,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    let credentials: {email, password};
    credentials = this.loginForm.value;
    this.authService.login(credentials).then(success => this.router.navigate(["trips"]).catch(err => console.log("Błędne dane logowania!")));
  }
}
