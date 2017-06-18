import { Component, OnInit, Input } from '@angular/core';
import { Accommodation } from '../accommodation';
import { HttpService } from "app/service/http-service";
import { AccomodationType } from "app/accomodation-type/accomodation-type";
import { ManagerService } from "app/service/manager-service";


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
  constructor(private httpService: HttpService, private managerService: ManagerService) { 
   
  }

  ngOnInit() {
    this.model.Name= "";
    this.model.AccomTypeName="";
    this.model.ATId=0;
    this.managerService.getAccommodationTypes().subscribe(
       (accts: any) => {
            this.acctypes = accts;
            //console.log(this.regions);
          },
      error => {
          alert("Unsuccessful fetch operation!");
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
          alert("Unsuccessful fetch operation!");
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
          alert("Unsuccessful fetch operation!");
          console.log(error);
      }
    );
  }

}
