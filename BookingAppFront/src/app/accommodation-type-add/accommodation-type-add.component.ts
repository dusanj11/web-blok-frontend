import { Component, OnInit } from '@angular/core';
import { AccomodationType } from '../accomodation-type/accomodation-type';
import { NgForm } from '@angular/forms';
import { ManagerService } from "app/service/manager-service";
import { AuthService } from "app/service/auth-service";
import { NotificationService } from "ng2-notify-popup";
import { Router } from "@angular/router";

@Component({
  selector: 'app-accommodation-type-add',
  templateUrl: './accommodation-type-add.component.html',
  styleUrls: ['./accommodation-type-add.component.css']
})
export class AccommodationTypeAddComponent implements OnInit {

  currentUserToken: string;

  constructor(private router: Router, private notifService: NotificationService, private managerService: ManagerService, private authService: AuthService) { }

  ngOnInit() {
      this.currentUserToken = this.authService.currentUserToken();
  }

  onSubmitAccommodationType(accommodationType: AccomodationType, ngForm: NgForm){


    this.managerService.postAccommodationType(accommodationType, this.currentUserToken).subscribe(
      (resp: any ) => {

        this.notifService.show("Successfully added new accommodation type!", {type: 'success', position:'bottom'});
          console.log("Accommodation type added");
          this.router.navigate(['/administration']);
      },
      error => {
        this.notifService.show("Error adding new accommodation type!", {type: 'error', position:'bottom'});

          console.log(error);
      }

    );

  }
}
