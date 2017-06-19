import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms/src/forms";
import { Accommodation } from "app/accommodation/accommodation";
import { HttpService } from "app/service/http-service";
import { AuthService } from "app/service/auth-service";
import { AccomodationType } from "app/accomodation-type/accomodation-type";
import { Place } from "app/place/place";
import { ManagerService } from "app/service/manager-service";
import { AdminService } from "app/service/admin-service";
import { NotificationService } from "ng2-notify-popup";
import { Router } from "@angular/router";

@Component({
  selector: 'app-accommodation-add',
  templateUrl: './accommodation-add.component.html',
  styleUrls: ['./accommodation-add.component.css']
})
export class AccommodationAddComponent implements OnInit {

    uploadImageName: string;
    acctypes: AccomodationType[];
    places: Place[];
    token: string;
    model: any={};

  constructor(private router: Router,private notifService: NotificationService, private httpService: HttpService, private authService: AuthService,
              private managerService: ManagerService, private adminService: AdminService ) { }

  onSubmitAccommodation(createdAccommodation: Accommodation, form: NgForm){
      let accommodation: Accommodation;
      console.log("Kreiran smestaj");
      createdAccommodation.ImageURL = this.uploadImageName;
      createdAccommodation.AppUserId = this.authService.currentUserId();

      this.acctypes.forEach(element => {
            if(element.Name == createdAccommodation.AccomTypeName){
                createdAccommodation.AccommodationTypeId = element.Id;
            }
      });

      this.places.forEach(element => {
            if (element.Name == createdAccommodation.PlaceName){
                createdAccommodation.PlaceId = element.Id;
            }
      });

      let access_token: string = this.authService.currentUserToken();

      this.managerService.postAccommodation(createdAccommodation, access_token).subscribe(
          (res: any) => {
              this.notifService.show("Successfully added new accommodation!", {type: 'success', position:'bottom'});
                console.log("Kreiran smestaj");
          },
          error => {
            this.notifService.show("Error adding new accommodation!", {type: 'error', position:'bottom'});
              console.log(error);
          }
      );

      //kada se doda nov smestaj neka prebaci na pocetnu stranicu
      this.router.navigate(['/accommodation']);

  }

  mapClicked($event: any)
    {
      this.model = 
      {
        Latitude: $event.coords.lat,
        Longitude: $event.coords.lng
      }

      console.log(this.model.Latitude + " " + this.model.Longitude);
    }

  imageUploaded(mess: any){
      console.log("Image Uploaded name:");
      console.log(mess.file.name);
      this.uploadImageName = mess.file.name;
  }

  imageRemoved(mess: any){
    //   console.log("Image Removed");
    //   console.log(mess);
    this.uploadImageName = "";
    console.log("Image name:");
  }

  disableSendButton(mess: boolean){
    //   console.log("Disable send button");
    //   console.log(mess);
  }

  ngOnInit() {

      this.token = `Bearer ${this.authService.currentUserToken()}`;

      this.adminService.getPlaces().subscribe(
       (regs: any) => {
            this.places = regs;
            //console.log(this.regions);
          },
      error => {
        //   alert("Unsuccessful fetch operation!");
        this.notifService.show("Error fetching places!", {type: 'error', position:'bottom'});

          console.log(error);
      }
    );

    this.managerService.getAccommodationTypes().subscribe(
       (accts: any) => {
            this.acctypes = accts;
            //console.log(this.regions);
          },
      error => {
        //   alert("Unsuccessful fetch operation!");
        this.notifService.show("Error fetching accommodation types!", {type: 'error', position:'bottom'});

          console.log(error);
      }
    );
  }

}
