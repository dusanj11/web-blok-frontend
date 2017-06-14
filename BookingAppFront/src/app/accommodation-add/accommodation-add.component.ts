import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accommodation-add',
  templateUrl: './accommodation-add.component.html',
  styleUrls: ['./accommodation-add.component.css']
})
export class AccommodationAddComponent implements OnInit {

  constructor() { }

  imageUploaded(mess: any){
      console.log("Image Uploaded");
  }

  imageRemoved(mess: any){
      console.log("Image Removed");
  }

  disableSendButton(mess: boolean){
      console.log("Disable send button");
  }

  ngOnInit() {
  }

}
