import { Component, OnInit } from '@angular/core';
import { AccomodationType } from '../accomodation-type/accomodation-type';
import { NgForm } from '@angular/forms';
import { ManagerService } from "app/service/manager-service";
import { AuthService } from "app/service/auth-service";

@Component({
  selector: 'app-accommodation-type-add',
  templateUrl: './accommodation-type-add.component.html',
  styleUrls: ['./accommodation-type-add.component.css']
})
export class AccommodationTypeAddComponent implements OnInit {

  currentUserToken: string;

  constructor(private managerService: ManagerService, private authService: AuthService) { }

  ngOnInit() {
      this.currentUserToken = this.authService.currentUserToken();
  }

  onSubmitAccommodationType(accommodationType: AccomodationType, ngForm: NgForm){


    this.managerService.postAccommodationType(accommodationType, this.currentUserToken).subscribe(
      (resp: any ) => {
          console.log("Accommodation type added");
      },
      error => {
          console.log(error);
      }

    );

  }
}
