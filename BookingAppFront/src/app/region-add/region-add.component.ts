import { Component, OnInit, Input } from '@angular/core';
import { Country } from "app/country/country";
import { CountryComponent } from "app/country/country.component";
import { HttpService } from "app/service/http-service";


@Component({
  selector: 'app-region-add',
  templateUrl: './region-add.component.html',
  styleUrls: ['./region-add.component.css']
})
export class RegionAddComponent implements OnInit {

@Input() regCountries : Country[];
httpService: HttpService;
  constructor() { 
    
    let cm = new CountryComponent(this.httpService);
    this.regCountries = cm.countries;
  }

  ngOnInit() {
  }

}
