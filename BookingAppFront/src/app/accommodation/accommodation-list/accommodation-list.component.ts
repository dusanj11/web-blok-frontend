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

  @Input() accommodationList: Accommodation[];
  @Input() accListPlace: number;
  acctypes: AccomodationType[];
  model: any = {};
  constructor(private notifService: NotificationService, private httpService: HttpService, private managerService: ManagerService) { 
   
  }

  ngOnInit() {
    this.model.Name= "";
    this.model.AccomTypeName="";
    this.model.Description="";
    this.model.ATId=0;
    this.managerService.getAccommodationTypes().subscribe(
       (accts: any) => {
            this.acctypes = accts;
            //console.log(this.regions);
          },
      error => {
          // alert("Unsuccessful fetch operation!");
          this.notifService.show("Error fetching accommodation types!", {type: 'error', position:'bottom'});

          console.log(error);
      }
    );
  }

  doNameFilter()
  {
    this.httpService.getFilteredAccommodation(this.model.Name).subscribe(
       (accs: any) => {
            this.accommodationList = JSON.parse(accs._body);
            //console.log(this.places);
          },
      error => {
          //alert("Unsuccessful fetch operation!");
          this.notifService.show("Error fetching name filtered accommodations!", {type: 'error', position:'bottom'});

          console.log(error);
      }
    );
  }

  doATypeFilter()
  {

    this.acctypes.forEach(element => {
      if(element.Name == this.model.AccomTypeName)
      {
        this.model.ATId = element.Id;
      }
      
    });
    this.httpService.getFilteredAccommodationTypes(this.model.ATId).subscribe(
       (accs: any) => {
            this.accommodationList = JSON.parse(accs._body);
            //console.log(this.places);
          },
      error => {
          // alert("Unsuccessful fetch operation!");
          this.notifService.show("Error fetching accommodation type filtered accommodations!", {type: 'error', position:'bottom'});

          console.log(error);
      }
    );
  }

  doDescriptionFilter()
  {
    this.httpService.getDescriptionAccommodationFiltered(this.model.Description).subscribe(
       (accs: any) => {
            this.accommodationList = JSON.parse(accs._body);
            //console.log(this.places);
          },
      error => {
          // alert("Unsuccessful fetch operation!");
      this.notifService.show("Error fetching description filtered accommodations!", {type: 'error', position:'bottom'});

          console.log(error);
      }
    );
  }

}
