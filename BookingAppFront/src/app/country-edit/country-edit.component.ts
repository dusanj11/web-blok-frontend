import { Component, OnInit } from '@angular/core';
import { Country } from "app/country/country";
import { HttpService } from "app/service/http-service";
import { AuthService } from "app/service/auth-service";
import { AdminService } from "app/service/admin-service";

@Component({
  selector: 'app-country-edit',
  templateUrl: './country-edit.component.html',
  styleUrls: ['./country-edit.component.css']
})
export class CountryEditComponent implements OnInit {

countries: Country[];
model: any={};
country: Country;

  constructor(private httpService: HttpService, private authService: AuthService, private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getCountries().subscribe(
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

  deleteCountry(countryId: number) 
  {
    this.countries.forEach(element => {
      if(element.Id == countryId)
      {
        this.country = element;
      }
    });

    let access_token: string = this.authService.currentUserToken();

    this.adminService.deleteCountry(this.country, access_token).subscribe(
       (conts: any) => {
                // this.countries = conts;
                //console.log(this.countries)
              },
        error => {
            alert("Unsuccessful delete operation!");
            console.log(error);
        }
    );

    // this.ngOnInit();
  }

  editCountry(countryId: number)
  {
    this.countries.forEach(element => {
      if(element.Id == countryId)
      {
        this.country = element;
      }
    });

    this.model.Name = this.country.Name;
    this.model.Code = this.country.Code;

    console.log(this.country.Id + " "+ this.country.Name + " "+this.country.Code);
  }

  updateCountry()
  {
      this.country.Name = this.model.Name;
      this.country.Code = this.model.Code;
      let access_token: string = this.authService.currentUserToken();

      this.adminService.putCountry(this.country, access_token).subscribe(
       (conts: any) => {
                // this.countries = conts;
                console.log(this.countries)
              },
        error => {
            alert("Unsuccessful put operation!");
            console.log(error);
        }
    );

    // this.ngOnInit();
  }

}
