import { Component, OnInit } from '@angular/core';
import { Accommodation } from "app/accommodation/accommodation";
import { Place } from "app/place/place";
import { AccomodationType } from "app/accomodation-type/accomodation-type";
import { AuthService } from "app/service/auth-service";
import { ManagerService } from "app/service/manager-service";
import { AdminService } from "app/service/admin-service";

@Component({
  selector: 'app-accommodation-edit',
  templateUrl: './accommodation-edit.component.html',
  styleUrls: ['./accommodation-edit.component.css']
})
export class AccommodationEditComponent implements OnInit {

  accommodations: Accommodation[];
  accommodation: Accommodation;
  places: Place[];
  acctypes: AccomodationType[];
  model: any = {};

  constructor(private adminService: AdminService, private authService: AuthService, private managerService: ManagerService) { }

  ngOnInit() {

    this.managerService.getAccommodation().subscribe(
      (accs: any) => {
        this.accommodations = accs;
        //console.log(this.countries)

        this.managerService.getAccommodationTypes().subscribe(
          (accst: any) => {
            this.acctypes = accst;
            //console.log(this.countries)
            this.accommodations.forEach(elementR => {

              this.acctypes.forEach(elementC => {

                if (elementR.AccomTypeId == elementC.Id) {
                  elementR.AccomTypeName = elementC.Name;
                }
              });
            });
          },
          error => {
            alert("Unsuccessful fetch operation!");
            console.log(error);
          }
        );

        this.adminService.getPlaces().subscribe(
          (plc: any) => {
            this.places = plc;
            //console.log(this.countries)

            this.accommodations.forEach(elementR => {

              this.places.forEach(elementC => {

                if (elementR.PlaceId == elementC.Id) {
                  elementR.PlaceName = elementC.Name;
                }
              });
            });
          },
          error => {
            alert("Unsuccessful fetch operation!");
            console.log(error);
          }
        );
      },
      error => {
        alert("Unsuccessful fetch operation!");
        console.log(error);
      }
    );

  }

  deleteAccommodation(accommodationId: number)
  {

  }

  editAccommodation(accommodationId: number)
  {

  }

  updateAccommodation()
  {
    
  }



}
