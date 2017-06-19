import { Component, OnInit } from '@angular/core';
import { Country } from "app/country/country";
import { HttpService } from "app/service/http-service";
import { NgForm } from "@angular/forms";
import { AdminService } from "app/service/admin-service";
import { AuthService } from "app/service/auth-service";
import { NotificationService } from "ng2-notify-popup";
import { Router } from "@angular/router";

@Component({
  selector: 'app-country-add',
  templateUrl: './country-add.component.html',
  styleUrls: ['./country-add.component.css']
})
export class CountryAddComponent implements OnInit {

  constructor(private router: Router, private notifService: NotificationService, private httpService: HttpService, private adminService: AdminService,
              private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmitCountry(con: Country, form: NgForm)
  {
      let access_token: string = this.authService.currentUserToken();

      this.adminService.postCountry(con, access_token).subscribe(
      (conts: any) => {
                //console.log(this.conts);
                this.notifService.show("Successfully added new country!", {type: 'success', position:'bottom'});
                this.router.navigate(['/administration']);
              },
        error => {
            // alert("Unsuccessful post operation!");
            this.notifService.show("Error adding new country!", {type: 'error', position:'bottom'});
            console.log(error);
        }
    );
  }

}
