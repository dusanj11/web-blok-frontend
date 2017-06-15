import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms/src/forms";
import { Accommodation } from "app/accommodation/accommodation";
import { HttpService } from "app/service/http-service";
import { AuthService } from "app/service/auth-service";

@Component({
  selector: 'app-accommodation-add',
  templateUrl: './accommodation-add.component.html',
  styleUrls: ['./accommodation-add.component.css']
})
export class AccommodationAddComponent implements OnInit {

    uploadImageName: string;

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
  }

}
