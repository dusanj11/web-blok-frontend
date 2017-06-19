import { Component, OnInit } from '@angular/core';
import { AccomodationType } from "app/accomodation-type/accomodation-type";
import { HttpService } from "app/service/http-service";
import { ManagerService } from "app/service/manager-service";
import { AuthService } from "app/service/auth-service";
import { NotificationService } from "ng2-notify-popup";
import { Router } from "@angular/router";

@Component({
  selector: 'app-accommodation-type-edit',
  templateUrl: './accommodation-type-edit.component.html',
  styleUrls: ['./accommodation-type-edit.component.css']
})
export class AccommodationTypeEditComponent implements OnInit {

acctypes: AccomodationType[];
model: any={};
acctype: AccomodationType;


  constructor(private router: Router, private notifService: NotificationService, private httpService: HttpService, private managerService: ManagerService,
              private authService: AuthService) { }

  ngOnInit() {

    this.managerService.getAccommodationTypes().subscribe(
       (conts: any) => {
                this.acctypes = conts;
                //console.log(this.countries)
              },
        error => {
            // alert("Unsuccessful fetch operation!");
            this.notifService.show("Error fetching accommodation types!", {type: 'error', position:'bottom'});

            console.log(error);
        }
    );
  }

  deleteAccommodationType(acctypeId: number) 
  {
    this.acctypes.forEach(element => {
      if(element.Id == acctypeId)
      {
        this.acctype = element;
      }
    });

    let access_token: string = this.authService.currentUserToken();

    this.managerService.deleteAccommodationType(this.acctype, access_token).subscribe(
       (regs: any) => {
                // this.countries = conts;
                //console.log(this.countries)
                this.notifService.show("Successfully deleted accommodation type!", {type: 'success', position:'bottom'});
                
              },
        error => {
            // alert("Unsuccessful delete operation!");
            this.notifService.show("Error deleting accommodation type!", {type: 'error', position:'bottom'});

            console.log(error);
        }
    );

    // this.ngOnInit();
  }

  editAccommodationType(acctypeId: number)
  {
    this.acctypes.forEach(element => {
      if(element.Id == acctypeId)
      {
        this.acctype = element;
      }
    });

    this.model.Name = this.acctype.Name;

    console.log(this.acctype.Id + " "+ this.acctype.Name);
 
  }

  updateAccommodationType()
  {
      this.acctype.Name = this.model.Name;

      let access_token = this.authService.currentUserToken();
      this.managerService.putAccommodationType(this.acctype, access_token).subscribe(
       (regs: any) => {
                // this.countries = conts;
                this.notifService.show("Successfully edited accommodation type!", {type: 'success', position:'bottom'});

                console.log(this.acctypes);
                this.model = {};

              },
        error => {
            // alert("Unsuccessful put operation!");
            this.notifService.show("Error editing accommodaton type!", {type: 'error', position:'bottom'});

            console.log(error);
        }
    );

    // this.ngOnInit();
  }

}
