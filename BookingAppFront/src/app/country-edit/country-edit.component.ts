import { Component, OnInit } from '@angular/core';
import { Country } from "app/country/country";
import { HttpService } from "app/service/http-service";

@Component({
  selector: 'app-country-edit',
  templateUrl: './country-edit.component.html',
  styleUrls: ['./country-edit.component.css']
})
export class CountryEditComponent implements OnInit {

  constructor(public countries: Country[], public httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getCountries().subscribe(
       (conts: any) => {
                this.countries = conts;
                //console.log(this.countries)
              },
        error => {
            alert("Unsuccessful fetch operation!");
            console.log(error);
        }
    );
  }

}
