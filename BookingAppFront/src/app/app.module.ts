import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HttpModule} from '@angular/http';

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
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
