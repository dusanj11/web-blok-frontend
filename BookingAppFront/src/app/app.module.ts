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

const Routes =
[
  {path: "country", component: CountryComponent},
  {path: "place", component: PlaceComponent},
  {path: "other", redirectTo:"country"}
]

@NgModule({
  declarations: [
    AppComponent,
    CountryComponent,
    PlaceComponent
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
