import { Component, OnInit } from '@angular/core';
import { isConstructorDeclaration } from 'typescript';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';
import { AuthenticationService } from './authentication.service';
import { Title } from "@angular/platform-browser";
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'WycieczkiMarzeń';
  logged: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private authService: AuthenticationService, 
    private authGuard: AuthGuard,
    private adminGuard: AdminGuard,
    private titleService:Title,
    private router: Router
    ){
      this.titleService.setTitle(this.title);
    }

  ngOnInit(): void {
    this.isLoggedIn();
    this.hasAdminRole();
    this.router.events.subscribe(event => {
      this.isLoggedIn();
      this.hasAdminRole();
    })
  }

  logout() {
    this.authService.logout().then( () => this.router.navigate(["trips"])
    );
  }

  isLoggedIn() {
    this.authGuard.canActivate(null, null).subscribe(result => {
      this.logged = result;
      // console.log("LOGGED IN?", result);
    });
    
  }

  hasAdminRole() {
    this.adminGuard.canActivate(null, null).subscribe(result => {
      this.isAdmin = result;
      // console.log("ADMIN ROLE IN?", result);
    });
  }

  update() {
    this.isLoggedIn();
    this.hasAdminRole();
  }

}

