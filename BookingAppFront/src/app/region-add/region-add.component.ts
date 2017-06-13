import { Component, OnInit, Input } from '@angular/core';
import { Country } from "app/country/country";
import { CountryComponent } from "app/country/country.component";
import { HttpService } from "app/service/http-service";
import { NgForm } from "@angular/forms";
import { Region } from "app/country/region/region";


@Component({
  selector: 'app-region-add',
  templateUrl: './region-add.component.html',
  styleUrls: ['./region-add.component.css']
})
export class RegionAddComponent implements OnInit {

@Input() regCountries : Country[];

  constructor(public httpService: HttpService) { 
  }

  ngOnInit() {

    this.httpService.getCountries().subscribe(
       (conts: any) => {
                this.regCountries = conts;
                console.log(this.regCountries)
              },
        error => {
            alert("Unsuccessful fetch operation!");
            console.log(error);
        }
    );
  }

  onSubmitRegion(reg: Region, form: NgForm) :void
  {
    this.regCountries.forEach(element => {
      if(element.Name == reg.CountryName)
      {
        reg.CountryId = element.Id;
      }
      
    });
      this.httpService.postRegion(reg).subscribe(
      (conts: any) => {
                //console.log(this.conts);
              },
        error => {
            alert("Unsuccessful post operation!");
            console.log(error);
        }
    );
  }

}
