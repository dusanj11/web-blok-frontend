import { Component, OnInit } from '@angular/core';
import { AccomodationType } from "app/accomodation-type/accomodation-type";
import { HttpService } from "app/service/http-service";

@Component({
  selector: 'app-accommodation-type-edit',
  templateUrl: './accommodation-type-edit.component.html',
  styleUrls: ['./accommodation-type-edit.component.css']
})
export class AccommodationTypeEditComponent implements OnInit {

acctypes: AccomodationType[];
model: any={};
acctype: AccomodationType;


  constructor(public httpService: HttpService) { }

  ngOnInit() {

    this.httpService.getAccommodationTypes().subscribe(
       (conts: any) => {
                this.acctypes = conts;
                //console.log(this.countries)
              },
        error => {
            alert("Unsuccessful fetch operation!");
            console.log(error);
        }
    );
  }

  deleteAccommodationType(acctypeId: number) 
  {
    this.acctypes.forEach(element => {
      if(element.Id == acctypeId)
      {
        this.acctype = element;
      }
    });

    this.httpService.deleteAccommodationType(this.acctype).subscribe(
       (regs: any) => {
                // this.countries = conts;
                //console.log(this.countries)
              },
        error => {
            alert("Unsuccessful delete operation!");
            console.log(error);
        }
    );
  }

  editAccommodationType(acctypeId: number)
  {
    this.acctypes.forEach(element => {
      if(element.Id == acctypeId)
      {
        this.acctype = element;
      }
    });

    this.model.Name = this.acctype.Name;

    console.log(this.acctype.Id + " "+ this.acctype.Name);
 
  }

  updateRegion()
  {
      this.acctype.Name = this.model.Name;

      this.httpService.putAccommodationType(this.acctype).subscribe(
       (regs: any) => {
                // this.countries = conts;
                console.log(this.acctypes)
              },
        error => {
            alert("Unsuccessful put operation!");
            console.log(error);
        }
    );
  }

}
