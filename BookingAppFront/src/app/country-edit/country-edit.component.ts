import { Component, OnInit } from '@angular/core';
import { Country } from "app/country/country";
import { HttpService } from "app/service/http-service";
import { AuthService } from "app/service/auth-service";
import { AdminService } from "app/service/admin-service";
import { NotificationService } from "ng2-notify-popup";

@Component({
  selector: 'app-country-edit',
  templateUrl: './country-edit.component.html',
  styleUrls: ['./country-edit.component.css']
})
export class CountryEditComponent implements OnInit {

countries: Country[];
model: any={};
country: Country;

  constructor(private notifService: NotificationService, private httpService: HttpService, private authService: AuthService, private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getCountries().subscribe(
       (conts: any) => {
                this.countries = conts;
                //console.log(this.countries)
              },
        error => {
            // alert("Unsuccessful fetch operation!");
        this.notifService.show("Error fetching countries!", {type: 'error', position:'bottom'});

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
                this.notifService.show("Successfully deleted country!", {type: 'success', position:'bottom'});
                this.ngOnInit();
              },
        error => {
            // alert("Unsuccessful delete operation!");
            this.notifService.show("Error deleting country!", {type: 'error', position:'bottom'});

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
                this.notifService.show("Successfully edited country!", {type: 'success', position:'bottom'});

                console.log(this.countries);
                this.model = {};
                this.ngOnInit();
              },
        error => {
            // alert("Unsuccessful put operation!");
            this.notifService.show("Error editing country!", {type: 'error', position:'bottom'});

            console.log(error);
        }
    );

    // this.ngOnInit();
  }

}
