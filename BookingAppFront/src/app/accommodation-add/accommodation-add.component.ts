import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms/src/forms";
import { Accommodation } from "app/accommodation/accommodation";
import { HttpService } from "app/service/http-service";
import { AuthService } from "app/service/auth-service";
import { AccomodationType } from "app/accomodation-type/accomodation-type";
import { Place } from "app/place/place";
import { ManagerService } from "app/service/manager-service";
import { AdminService } from "app/service/admin-service";

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

  constructor(private httpService: HttpService, private authService: AuthService,
              private managerService: ManagerService, private adminService: AdminService ) { }

  onSubmitAccommodation(createdAccommodation: Accommodation, form: NgForm){
      let accommodation: Accommodation;
      console.log("Kreiran smestaj");
      createdAccommodation.ImageURL = this.uploadImageName;
      createdAccommodation.AppUserId = this.authService.currentUserId();

      this.acctypes.forEach(element => {
            if(element.Name == createdAccommodation.AccomTypeName){
                createdAccommodation.AccomTypeId = element.Id;
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
                console.log("Kreiran smestaj");
          },
          error => {
              console.log(error);
          }
      );

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
          alert("Unsuccessful fetch operation!");
          console.log(error);
      }
    );

    this.managerService.getAccommodationTypes().subscribe(
       (accts: any) => {
            this.acctypes = accts;
            //console.log(this.regions);
          },
      error => {
          alert("Unsuccessful fetch operation!");
          console.log(error);
      }
    );
  }

}
