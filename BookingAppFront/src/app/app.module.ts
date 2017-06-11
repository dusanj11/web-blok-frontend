//import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//import {NoopAnimationsModule} from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { CountryComponent } from './country/country.component';
import { PlaceComponent } from './place/place.component';
import { AccommodationComponent } from './accommodation/accommodation.component';
import { RegisterComponent } from './register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AccomodationTypeComponent } from './accomodation-type/accomodation-type.component';
import { CommentComponent } from './comment/comment.component';
import { RoomComponent } from './room/room.component';
import { RoomReservationComponent } from './room-reservation/room-reservation.component';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AccommodationListComponent } from './accommodation/accommodation-list/accommodation-list.component';
import { AccommodationRowComponent } from './accommodation/accommodation-row/accommodation-row.component';
import { AccommodationDetailsComponent } from './accommodation/accommodation-details/accommodation-details.component';
import { RegionComponent } from './country/region/region.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';


const Routes =
[
  {path: "signIn", component: HomeComponent},
  {path: "accommodation", component: CountryComponent },
  {path: "accommodation-details/:id", component: AccommodationDetailsComponent},
  {path: "other", redirectTo:"signIn"}
]

@NgModule({
  declarations: [
    AppComponent,
    CountryComponent,
    PlaceComponent,
    AccommodationComponent,
    RegisterComponent,
    SignInComponent,
    AccomodationTypeComponent,
    CommentComponent,
    RoomComponent,
    RoomReservationComponent,
    HomeComponent,
    ToolbarComponent,
    AccommodationListComponent,
    AccommodationRowComponent,
    AccommodationDetailsComponent,
    RegionComponent,
    AdminPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(Routes),
    HttpModule,
    MaterialModule,
    //NoopAnimationsModule
    BrowserAnimationsModule
    //MaterialModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
