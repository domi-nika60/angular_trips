import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './User';
import { UserClass } from './user-class';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private db: AngularFirestore) { }

  addUser(newUser: User): Promise<any> {
    return this.db.collection("users/").doc(newUser.id).set(newUser);
  }

  getUser(userId: string): Observable<User> {
    return this.db.collection("users/").doc<User>(userId).get().pipe(map(d => d.data()));
  }
}
