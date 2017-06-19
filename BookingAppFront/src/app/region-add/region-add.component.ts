import { Component, OnInit, Input } from '@angular/core';
import { Country } from "app/country/country";
import { CountryComponent } from "app/country/country.component";
import { HttpService } from "app/service/http-service";
import { NgForm } from "@angular/forms";
import { Region } from "app/country/region/region";
import { AdminService } from "app/service/admin-service";
import { AuthService } from "app/service/auth-service";
import { NotificationService } from "ng2-notify-popup";
import { Router } from "@angular/router";


@Component({
  selector: 'app-region-add',
  templateUrl: './region-add.component.html',
  styleUrls: ['./region-add.component.css']
})
export class RegionAddComponent implements OnInit {

@Input() regCountries : Country[];

  constructor(private router: Router, private notifService: NotificationService, private adminService: AdminService, private authService: AuthService) { 
  }

  ngOnInit() {

    this.adminService.getCountries().subscribe(
       (conts: any) => {
                this.regCountries = conts;
                console.log(this.regCountries)
              },
        error => {
            // alert("Unsuccessful fetch operation!");
            this.notifService.show("Error fetching countries!", {type: 'error', position:'bottom'});

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

      let access_token: string = this.authService.currentUserToken();

      this.adminService.postRegion(reg, access_token).subscribe(
      (conts: any) => {
                //console.log(this.conts);
                this.notifService.show("Successfully added new accommodation!", {type: 'success', position:'bottom'});
                this.router.navigate(['/administration']);

              },
        error => {
            // alert("Unsuccessful post operation!");
            this.notifService.show("Error adding region!", {type: 'error', position:'bottom'});

            console.log(error);
        }
    );
  }

}
