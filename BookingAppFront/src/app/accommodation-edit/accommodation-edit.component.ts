import { Component, OnInit } from '@angular/core';
import { Accommodation } from "app/accommodation/accommodation";
import { Place } from "app/place/place";
import { AccomodationType } from "app/accomodation-type/accomodation-type";
import { AuthService } from "app/service/auth-service";
import { ManagerService } from "app/service/manager-service";
import { AdminService } from "app/service/admin-service";
import { NotificationService } from "ng2-notify-popup";
import { Router } from "@angular/router";

@Component({
  selector: 'app-accommodation-edit',
  templateUrl: './accommodation-edit.component.html',
  styleUrls: ['./accommodation-edit.component.css']
})
export class AccommodationEditComponent implements OnInit {

  accommodations: any[];
  accommodation: Accommodation;
  places: Place[];
  acctypes: AccomodationType[];
  model: any = {};

  uploadImageName: string;

  currentUserToken: string;

  constructor(private router: Router, private notifService: NotificationService, private adminService: AdminService, private authService: AuthService, private managerService: ManagerService) { }

  ngOnInit() {

    this.currentUserToken = this.authService.currentUserToken();

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

                if (elementR.AccommodationTypeId == elementC.Id) {
                  elementR.AccomTypeName = elementC.Name;
                }
              });
            });


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
            // alert("Unsuccessful fetch operation!");
            this.notifService.show("Error fetching places!", {type: 'error', position:'bottom'});

            console.log(error);
          }
        );
          },
          error => {
            // alert("Unsuccessful fetch operation!");
            this.notifService.show("Error fetching accommodation types!", {type: 'error', position:'bottom'});

            console.log(error);
          }
        );

        
      },
      error => {
        // alert("Unsuccessful fetch operation!");
        this.notifService.show("Error fetching accommodations!", {type: 'error', position:'bottom'});

        console.log(error);
      }
    );

  }

  deleteAccommodation(accommodationId: number)
  {
      this.accommodations.forEach(element => {
          if (element.Id == accommodationId){
            this.accommodation = element;
          }
      });

      this.managerService.deleteAccommodation(this.accommodation, this.currentUserToken).subscribe(
        (resp: any) => {
          this.notifService.show("Successfully deleted accommodation!", {type: 'success', position:'bottom'});
            console.log("Accommodation deleted");
            //kada uspesno izbrises vrati na administraciju
            // this.router.navigate(['/administration']);
            this.ngOnInit();
        },
        error => {
            // alert("Unsuccessful delete operation!");
            this.notifService.show("Error deleting Accommodation!", {type: 'error', position:'bottom'});

            console.log(error);
        }
      );
  }

  editAccommodation(accommodationId: number)
  {

      this.accommodations.forEach(element => {
          if (element.Id == accommodationId){
              this.accommodation = element;
              this.model.Name = element.Name;
              this.model.Address = element.Address;
              
              this.places.forEach(elementP => {
                  if (element.PlaceId == elementP.Id){
                      this.model.PlaceName = elementP.Name;
                  }
              });

              this.acctypes.forEach(elementA => {
                  if (element.AccommodationTypeId == elementA.Id){
                      this.model.AccomTypeName = elementA.Name;
                  }
              });
             
              this.model.Description = element.Description;
              this.model.Latitude = element.Latitude;
              this.model.Longitude = element.Longitute;
          }
      });
  }

  updateAccommodation()
  {
      

      this.places.forEach(element => {
          if (this.model.PlaceName == element.Name){
              this.accommodation.PlaceId = element.Id;
          }
      });

      this.acctypes.forEach(element => {
         if (this.model.AccomTypeName == element.Name){
            this.accommodation.AccommodationTypeId = element.Id;
         }
      });

      if (this.uploadImageName != null){
          this.accommodation.ImageURL = `http://localhost:54042/content/${this.uploadImageName}`;
      }
      this.accommodation.Name = this.model.Name;
      this.accommodation.Description = this.model.Description;
      this.accommodation.Address = this.model.Address;
      this.accommodation.Latitude = this.model.Latitude;
      this.accommodation.Longitude = this.model.Longitude;
      this.accommodation.ImageURL = this.model.ImageURL;
      

      this.managerService.putAccommodation(this.accommodation, this.currentUserToken).subscribe(
        (resp: any) => {
          this.notifService.show("Successfully edited accommodation!", {type: 'success', position:'bottom'});
            console.log("Updated accommodation");
              
            //kada uspesno edituje isprazniti model
            this.model = {};
            this.ngOnInit();
        },
        error => {
          this.notifService.show("Error editing accommodation!", {type: 'error', position:'bottom'});

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
    this.uploadImageName = null;
    console.log("Image name:");
  }

  disableSendButton(mess: boolean){
    //   console.log("Disable send button");
    //   console.log(mess);
  }


}
