import { Component, OnInit } from '@angular/core';
import { Place } from "app/place/place";
import { Region } from "app/country/region/region";
import { HttpService } from "app/service/http-service";
import { AdminService } from "app/service/admin-service";
import { AuthService } from "app/service/auth-service";
import { NotificationService } from "ng2-notify-popup";

@Component({
  selector: 'app-place-edit',
  templateUrl: './place-edit.component.html',
  styleUrls: ['./place-edit.component.css']
})
export class PlaceEditComponent implements OnInit {

  places: Place[] = [];
  regions: Region[] = [];
  model: any = {};
  place: Place;
  region: Region;

  constructor(private notifService: NotificationService, private httpService: HttpService, private adminService: AdminService,
              private authService: AuthService) { }

  ngOnInit() {

    this.adminService.getRegions().subscribe(
      (regs: any) => {
        this.regions = regs;
        //console.log(this.countries)
        this.adminService.getPlaces().subscribe(
          (plcs: any) => {
            this.places = plcs;
            //console.log(this.countries)
            this.places.forEach(elementP => {

              this.regions.forEach(elementR => {

                if (elementP.RegionId == elementR.Id) {
                  elementP.RegionName = elementR.Name;
                }
              });

            });

          },
          error => {
            // alert("Unsuccessful fetch operation!");
            this.notifService.show("Error fetching places!", {type: 'error', position:'bottom'});

            console.log(error);
          }
        );
      },
      error => {
        // alert("Unsuccessful fetch operation!");
        this.notifService.show("Error fetching regions!", {type: 'error', position:'bottom'});

        console.log(error);
      }
    );




  }

  deletePlace(placeId: number) {
    this.places.forEach(element => {
      if (element.Id == placeId) {
        this.place = element;
      }
    });

    let access_token: string = this.authService.currentUserToken();


    this.adminService.deletePlace(this.place, access_token).subscribe(
      (plcs: any) => {
        // this.countries = conts;
        //console.log(this.countries)
        this.notifService.show("Successfully deleted place!", {type: 'success', position:'bottom'});
        this.ngOnInit();
      },
      error => {
        // alert("Unsuccessful delete operation!");
        this.notifService.show("Error deleting place!", {type: 'error', position:'bottom'});

        console.log(error);
      }
    );

    // this.ngOnInit();
  }

  editPlace(placeId: number) {
    this.places.forEach(element => {
      if (element.Id == placeId) {
        this.place = element;
      }
    });

    this.model.Name = this.place.Name;
    this.model.RegionName = this.place.RegionName;

    console.log(this.place.Id + " " + this.place.Name + " " + this.place.RegionName);

  }

  updatePlace() {
    this.place.Name = this.model.Name;
    this.place.RegionName = this.model.RegionName;

    this.regions.forEach(element => {
      if (element.Name == this.place.RegionName) {
        this.place.RegionId = element.Id;
      }
    });

    let access_token: string = this.authService.currentUserToken();

    this.adminService.putPlace(this.place, access_token).subscribe(
      (plcs: any) => {
        // this.countries = conts;
        this.notifService.show("Successfully edited place!", {type: 'success', position:'bottom'});

        console.log(this.places);
        this.model = {};
        this.ngOnInit();
      },
      error => {
        // alert("Unsuccessful put operation!");
        this.notifService.show("Error editing place!", {type: 'error', position:'bottom'});

        console.log(error);
      }
    );

    // this.ngOnInit();
  }

}
