import { Component, OnInit, Input } from '@angular/core';
import { Accommodation } from '../accommodation';
import { HttpService } from "app/service/http-service";
import { AccomodationType } from "app/accomodation-type/accomodation-type";
import { ManagerService } from "app/service/manager-service";
import { NotificationService } from "ng2-notify-popup";


@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.css']
})
export class AccommodationListComponent implements OnInit {

  @Input() accommodationList: Accommodation[] = [];
  accommodationsOfThisPlace: Accommodation[] = [];
  pageAccommodations: Accommodation[] = [];
  @Input() accListPlace: number;
  acctypes: AccomodationType[] = [];
  model: any = {};
  pageNumber: number = 1;
  totalNumber: number = 0;
  totalPages: number = 1;
  pageNumbers: number[] = [];

  nameFilterOn: boolean = false;
  actypeFilterOn: boolean = false;
  descFilterOn: boolean = false;
  noneFilterOn: boolean = true;

  constructor(private notifService: NotificationService, private httpService: HttpService, private managerService: ManagerService) {

  }

  ngOnInit() {

    this.managerService.getAccommodationTypes().subscribe(
      (accts: any) => {
        this.acctypes = accts;
        //console.log(this.regions);
        this.model.Name = "";
        this.model.AccomTypeName = "";
        this.model.Description = "";
        this.model.ATId = 0;
        //this.pageNumbers = Array(Math.ceil(this.totalPages)).map((x, i) => i);
        this.managerService.getPaginationAccommodation(this.pageNumber, this.accListPlace).subscribe(
          (res2: any) => {
            this.pageAccommodations = JSON.parse(res2._body);
            console.log(this.pageAccommodations);

            this.accommodationList.forEach(element => {
              if (element.PlaceId == this.accListPlace) {
                this.accommodationsOfThisPlace.push(element);
              }

            });

            this.totalNumber = this.accommodationsOfThisPlace.length;
            this.totalPages = this.totalNumber / 3;
            for (var index = 1; index < (this.totalPages + 1); index++) {
              this.pageNumbers.push(index);

            }


          },
          error => {
            //alert("Unsuccessful fetch operation!");
            this.notifService.show("Error fetching page accommodations!", { type: 'error', position: 'bottom' });
            console.log(error);
          }
        );
      },
      error => {
        // alert("Unsuccessful fetch operation!");
        this.notifService.show("Error fetching accommodation types!", { type: 'error', position: 'bottom' });

        console.log(error);
      }
    );



  }

  doPaginacija(pageNumber: number, placeId: number) {
    this.managerService.getPaginationAccommodation(pageNumber, placeId).subscribe(
      (res2: any) => {
        this.pageAccommodations = JSON.parse(res2._body);
        console.log(this.pageAccommodations);
      },
      error => {
        // alert("Unsuccessful fetch operation!");
        this.notifService.show("Error fetching page accommodations!", { type: 'error', position: 'bottom' });

        console.log(error);
      }
    );
  }

  doNamePaginacija(pageNumber: number, placeId: number) {
    this.httpService.getNamePaginationAccommodation(this.model.Name, placeId, pageNumber).subscribe(
      (res2: any) => {
        this.pageAccommodations = JSON.parse(res2._body);
        console.log(this.pageAccommodations);
      },
      error => {
        // alert("Unsuccessful fetch operation!");
        this.notifService.show("Error fetching page accommodations!", { type: 'error', position: 'bottom' });

        console.log(error);
      }
    );
  }

  doATypePaginacija(pageNumber: number, placeId: number) {
    this.acctypes.forEach(element => {
      if (element.Name == this.model.AccomTypeName) {
        this.model.ATId = element.Id;
      }
    });

    this.httpService.getAccommodationTypesPagination(this.model.ATId, placeId, pageNumber).subscribe(
      (res2: any) => {
        this.pageAccommodations = JSON.parse(res2._body);
        console.log(this.pageAccommodations);
      },
      error => {
        // alert("Unsuccessful fetch operation!");
        this.notifService.show("Error fetching page accommodations!", { type: 'error', position: 'bottom' });

        console.log(error);
      }
    );
  }

  doDescriptionPaginacija(pageNumber: number, placeId: number) {
    this.httpService.getDescriptionPaginationAccommodation(this.model.Description, placeId, pageNumber).subscribe(
      (res2: any) => {
        this.pageAccommodations = JSON.parse(res2._body);
        console.log(this.pageAccommodations);
      },
      error => {
        // alert("Unsuccessful fetch operation!");
        this.notifService.show("Error fetching page accommodations!", { type: 'error', position: 'bottom' });

        console.log(error);
      }
    );
  }

  cancelFilters() {
    this.nameFilterOn = false;
    this.actypeFilterOn = false;
    this.descFilterOn = false;
    this.noneFilterOn = true;
    this.accommodationsOfThisPlace = [];
    this.managerService.getAccommodation().subscribe(
      (res: any) => {
        this.accommodationList = res; //JSON.parse(res._body);
        console.log(this.accommodationList);

        this.managerService.getPaginationAccommodation(1, this.accListPlace).subscribe(
          (res2: any) => {
            this.pageAccommodations = JSON.parse(res2._body);
            console.log(this.pageAccommodations);
            this.pageNumbers = [];
            this.accommodationList.forEach(element => {
              if (element.PlaceId == this.accListPlace) {
                this.accommodationsOfThisPlace.push(element);
              }

            });

            this.totalNumber = this.accommodationsOfThisPlace.length;
            this.totalPages = this.totalNumber / 3;
            for (var index = 1; index < (this.totalPages + 1); index++) {
              this.pageNumbers.push(index);


            }
          },
          error => {
            // alert("Unsuccessful fetch operation!");
            this.notifService.show("Error fetching page accommodations!", { type: 'error', position: 'bottom' });

            console.log(error);
          }
        );

      },
      error => {
        //alert("Unsuccessful fetch operation!");
        this.notifService.show("Error fetching all accommodations!", { type: 'error', position: 'bottom' });

        console.log(error);
      }
    );
  }

  doNameFilter() {
    this.accommodationsOfThisPlace = [];
    this.managerService.getAccommodation().subscribe(
      (res: any) => {
        this.accommodationList = res; //JSON.parse(res._body);
        console.log(this.accommodationList);

        this.httpService.getNamePaginationAccommodation(this.model.Name, 1, this.accListPlace).subscribe(
          (accs: any) => {
            this.pageAccommodations = JSON.parse(accs._body);
            //console.log(this.places);
            this.nameFilterOn = true;
            this.actypeFilterOn = false;
            this.descFilterOn = false;
            this.noneFilterOn = false;

            this.pageNumbers = [];this.accommodationList.forEach(element => {
              if (element.PlaceId == this.accListPlace) {
                this.accommodationsOfThisPlace.push(element);
              }

            });

            this.totalNumber = this.accommodationsOfThisPlace.length;
            this.totalPages = this.totalNumber / 3;
            for (var index = 1; index < (this.totalPages + 1); index++) {
              this.pageNumbers.push(index);


            }
          },
          error => {
            //alert("Unsuccessful fetch operation!");
            this.notifService.show("Error fetching name filtered accommodations!", { type: 'error', position: 'bottom' });

            console.log(error);
          }
        );

      },
      error => {
        //alert("Unsuccessful fetch operation!");
        this.notifService.show("Error fetching all accommodations!", { type: 'error', position: 'bottom' });

        console.log(error);
      }
    );

  }

  doATypeFilter() {

    this.acctypes.forEach(element => {
      if (element.Name == this.model.AccomTypeName) {
        this.model.ATId = element.Id;
      }

    });
    this.httpService.getAccommodationTypesPagination(this.model.ATId, 1, this.accListPlace).subscribe(
      (accs: any) => {
        this.pageAccommodations = JSON.parse(accs._body);

        this.nameFilterOn = false;
        this.actypeFilterOn = true;
        this.descFilterOn = false;
        this.noneFilterOn = false;

        this.pageNumbers = [];
        this.totalNumber = this.pageAccommodations.length;
        this.totalPages = this.totalNumber / 3;
        for (var index = 1; index < (this.totalPages + 1); index++) {
          this.pageNumbers.push(index);

        }
        //console.log(this.places);
      },
      error => {
        // alert("Unsuccessful fetch operation!");
        this.notifService.show("Error fetching accommodation type filtered accommodations!", { type: 'error', position: 'bottom' });

        console.log(error);
      }
    );
  }

  doDescriptionFilter() {
    this.httpService.getDescriptionPaginationAccommodation(this.model.Description, 1, this.accListPlace).subscribe(
      (accs: any) => {
        this.pageAccommodations = JSON.parse(accs._body);
        //console.log(this.places);

        this.nameFilterOn = false;
        this.actypeFilterOn = false;
        this.descFilterOn = true;
        this.noneFilterOn = false;

        this.pageNumbers = [];
        this.totalNumber = this.pageAccommodations.length;
        this.totalPages = this.totalNumber / 3;
        for (var index = 1; index < (this.totalPages + 1); index++) {
          this.pageNumbers.push(index);

        }
      },
      error => {
        // alert("Unsuccessful fetch operation!");
        this.notifService.show("Error fetching description filtered accommodations!", { type: 'error', position: 'bottom' });

        console.log(error);
      }
    );
  }

}
