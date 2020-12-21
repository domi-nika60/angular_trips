import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppRoutingModule } from './app-routing.module';
import { RatingModule } from 'ng-starrating';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//materials
import { DropdownModule, MDBSpinningPreloader, MDBBootstrapModulesPro, ToastModule, CarouselModule, WavesModule } from 'ng-uikit-pro-standard'
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatInputModule } from '@angular/material/input';

//components
import { AppComponent } from './app.component';
import { TripsComponent } from './trips/trips.component';
import { TripListComponent } from './trip-list/trip-list.component';
import { TripRateComponent } from './trip-rate/trip-rate.component';
import { TripAddComponent } from './trip-add/trip-add.component';
import { BasketListComponent } from './basket/basket-list.component';
import { TripFilterComponent } from './trip-filter/trip-filter.component';
import { TripInfoComponent } from './trip-info/trip-info.component';
import { TripReviewComponent } from './trip-review/trip-review.component';
import { LogowanieComponent } from './logowanie/logowanie.component';
import { RejestracjaComponent } from './rejestracja/rejestracja.component';

//pipes
import { TripPriceFilterPipe } from './pipes/tripPriceFilter.pipe';
import { TripRateFilterPipe } from './pipes/tripRateFilter.pipe';

//firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http'

//services
import { InMemoryTripsService } from './in-memory-trips.service';
import { AuthenticationService } from './authentication.service';


@NgModule({
  declarations: [
    TripsComponent,
    AppComponent,
    TripListComponent,
    TripRateComponent,
    TripAddComponent,
    BasketListComponent,
    TripFilterComponent,
    TripPriceFilterPipe,
    TripRateFilterPipe,
    TripInfoComponent,
    TripReviewComponent,
    LogowanieComponent,
    RejestracjaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RatingModule,
    ReactiveFormsModule,
    NgbModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    FlexLayoutModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryTripsService, { delay:100}),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule, // do obsługi autentykacji
    AngularFirestoreModule,
    MDBBootstrapModulesPro.forRoot(), 
    BrowserAnimationsModule,
    CarouselModule
  ],
  providers: [{provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR'}, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
