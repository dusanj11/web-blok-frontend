import { Component, OnInit, Input } from '@angular/core';
import {Country} from './country';
import { HttpService } from "app/service/http-service";
import { AdminService } from "app/service/admin-service";
import { NotificationService } from "ng2-notify-popup";



@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  countries: Country[];

  constructor(private notifService: NotificationService, private httpService: HttpService, private adminService: AdminService) {
    // this.countries = [
    //   new Country(1,"Srbija", "RS"),
    //   new Country(2,"Bosna i Hercegovina", "BiH"),
    //   new Country(3,"Makedonija", "MKD")
    // ];

   

  }


  ngOnInit()
  {
     this.adminService.getCountries().subscribe(
       (conts: any) => {
                this.countries = conts;
                //console.log(this.countries)
              },
        error => {
            // alert("Unsuccessful fetch operation!");
            this.notifService.show("Error fetching countries", {type: 'error', position:'bottom'});
            console.log(error);
        }
    );
  }

}
