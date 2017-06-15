import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms/src/forms";
import { Accommodation } from "app/accommodation/accommodation";

@Component({
  selector: 'app-accommodation-add',
  templateUrl: './accommodation-add.component.html',
  styleUrls: ['./accommodation-add.component.css']
})
export class AccommodationAddComponent implements OnInit {

    uploadImageName: string;

  constructor() { }

  onSubmitAccommodation(createdAccommodation: any, form: NgForm){
      let accommodation: Accommodation;
      

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
