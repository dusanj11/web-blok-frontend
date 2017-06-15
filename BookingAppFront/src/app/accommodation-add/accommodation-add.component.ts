import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms/src/forms";
import { Accommodation } from "app/accommodation/accommodation";
import { HttpService } from "app/service/http-service";
import { AuthService } from "app/service/auth-service";
import { AccomodationType } from "app/accomodation-type/accomodation-type";
import { Place } from "app/place/place";

@Component({
  selector: 'app-accommodation-add',
  templateUrl: './accommodation-add.component.html',
  styleUrls: ['./accommodation-add.component.css']
})
export class AccommodationAddComponent implements OnInit {

    uploadImageName: string;
    acctypes: AccomodationType[];
    places: Place[];

  constructor(public httpService: HttpService, public authService: AuthService) { }

  onSubmitAccommodation(createdAccommodation: Accommodation, form: NgForm){
      let accommodation: Accommodation;
      console.log("Kreiran smestaj");
      createdAccommodation.ImageURL = this.uploadImageName;
      createdAccommodation.AppUserId = this.authService.currentUserId();

      this.httpService.postAccommodation(createdAccommodation).subscribe(
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

      this.httpService.getPlaces().subscribe(
       (regs: any) => {
            this.places = regs;
            //console.log(this.regions);
          },
      error => {
          alert("Unsuccessful fetch operation!");
          console.log(error);
      }
    );

    this.httpService.getAccommodationTypes().subscribe(
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
