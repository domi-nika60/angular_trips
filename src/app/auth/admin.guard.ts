import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from '../user.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private userSer: UserService,
    private authService: AuthenticationService,
    private router: Router,
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      return this.authService.authState$.pipe(switchMap(firebaseUser => {
        let subject: Subject<boolean> = new Subject<boolean>();
        if (firebaseUser == null) {
          subject.next(false);
          return subject.asObservable();
        }
  
        return this.userSer.getUser(firebaseUser.uid).pipe(map(user => {
          return user.role === 'admin';
        }))
      }));
      
    }
}
