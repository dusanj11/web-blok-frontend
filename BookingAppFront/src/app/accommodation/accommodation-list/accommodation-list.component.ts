import { Component, OnInit, Input } from '@angular/core';
import { Accommodation } from '../accommodation';
import { HttpService } from "app/service/http-service";


@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.css']
})
export class AccommodationListComponent implements OnInit {

  @Input() accommodationList: Accommodation[];
  @Input() accListPlace: number;

  model: any = {};
  constructor(private httpService: HttpService) { 
   
  }

  ngOnInit() {
    this.model.Name= "";
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

}
