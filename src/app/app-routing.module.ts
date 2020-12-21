import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';
import { TripAddComponent } from './trip-add/trip-add.component';
import { BasketListComponent } from './basket/basket-list.component';
import { TripListComponent } from './trip-list/trip-list.component';
import { TripInfoComponent } from './trip-info/trip-info.component';
import { TripReviewComponent } from './trip-review/trip-review.component';
import { LogowanieComponent } from './logowanie/logowanie.component';
import { RejestracjaComponent } from './rejestracja/rejestracja.component';

const routes: Routes = [
  { path: '', redirectTo: '/trips', pathMatch: 'full' },
  { path: 'trips', component: TripListComponent },
  { path: 'addTrip', component: TripAddComponent,  canActivate: [AuthGuard, AdminGuard] },
  { path: 'basket', component: BasketListComponent, canActivate: [AuthGuard] },
  { path: 'trips/:tripId', component: TripInfoComponent,  canActivate: [AuthGuard]},
  { path: 'review/:id/:rate', component: TripReviewComponent,  canActivate: [AuthGuard] },
  { path: 'login', component: LogowanieComponent },
  { path: 'register', component: RejestracjaComponent },
  { path: 'update/:id', component: TripAddComponent,  canActivate: [AuthGuard, AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
