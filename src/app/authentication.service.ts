import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@firebase/auth-types';
import { AngularFireAuth } from '@angular/fire/auth';
import { Credentials } from "./credentials";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  readonly authState$: Observable<User | null> = this.fireAuth.authState;

  constructor(private fireAuth: AngularFireAuth) { }

  getUser(): Promise<User> {
    return this.fireAuth.currentUser;
  }

  login({email, password}: Credentials) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  register({email, password}: Credentials) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }
 
  logout() {
    return this.fireAuth.signOut();
  }

}
