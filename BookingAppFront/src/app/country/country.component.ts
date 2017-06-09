import { Component, OnInit } from '@angular/core';
import {Country} from './country';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  countries: Country[];

  constructor() { 
    this.countries = [
      new Country(1,"Srbija", "RS"),
      new Country(2,"Bosna i Hercegovina", "BiH"),
      new Country(3,"Makedonija", "MKD")
    ];
  }


  ngOnInit() {
  }

  addCountry(newCountry: Country) : void
  {
    this.countries.push(newCountry);
  }

}
