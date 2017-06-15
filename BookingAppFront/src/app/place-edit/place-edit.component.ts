import { Component, OnInit } from '@angular/core';
import { Place } from "app/place/place";
import { Region } from "app/country/region/region";
import { HttpService } from "app/service/http-service";

@Component({
  selector: 'app-place-edit',
  templateUrl: './place-edit.component.html',
  styleUrls: ['./place-edit.component.css']
})
export class PlaceEditComponent implements OnInit {

places: Place[];
regions: Region[];
model: any={};
place: Place;
region: Region;

  constructor(public httpService: HttpService) { }

  ngOnInit() {

    this.httpService.getRegions().subscribe(
       (regs: any) => {
                this.regions = regs;
                //console.log(this.countries)
              },
        error => {
            alert("Unsuccessful fetch operation!");
            console.log(error);
        }
    );

    this.httpService.getPlaces().subscribe(
       (plcs: any) => {
                this.places = plcs;
                //console.log(this.countries)
              },
        error => {
            alert("Unsuccessful fetch operation!");
            console.log(error);
        }
    );

    this.places.forEach(elementP => {
      
      this.regions.forEach(elementR => {

            if(elementP.RegionId== elementR.Id)
            {
              elementP.RegionName = elementR.Name;
            }
      });

    });

  }

  deletePlace(placeId: number) 
  {
    this.places.forEach(element => {
      if(element.Id == placeId)
      {
        this.place = element;
      }
    });

    this.httpService.deletePlace(this.place).subscribe(
       (plcs: any) => {
                // this.countries = conts;
                //console.log(this.countries)
              },
        error => {
            alert("Unsuccessful delete operation!");
            console.log(error);
        }
    );

    this.ngOnInit();
  }

  editPlace(placeId: number)
  {
    this.places.forEach(element => {
      if(element.Id == placeId)
      {
        this.place = element;
      }
    });

    this.model.Name = this.place.Name;
    this.model.RegionName = this.place.RegionName;

    console.log(this.place.Id + " "+ this.place.Name + " "+this.place.RegionName);
 
  }

  updatePlace()
  {
      this.place.Name = this.model.Name;
      this.place.RegionName = this.model.RegionName;

      this.regions.forEach(element => {
        if(element.Name == this.place.RegionName)
        {
          this.place.RegionId = element.Id;
        }
      });


      this.httpService.putPlace(this.place).subscribe(
       (plcs: any) => {
                // this.countries = conts;
                console.log(this.places)
              },
        error => {
            alert("Unsuccessful put operation!");
            console.log(error);
        }
    );

    this.ngOnInit();
  }

}
