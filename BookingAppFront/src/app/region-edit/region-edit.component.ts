import { Component, OnInit } from '@angular/core';
import { Country } from "app/country/country";
import { Region } from "app/country/region/region";
import { HttpService } from "app/service/http-service";

@Component({
  selector: 'app-region-edit',
  templateUrl: './region-edit.component.html',
  styleUrls: ['./region-edit.component.css']
})
export class RegionEditComponent implements OnInit {

countries: Country[];
regions: Region[];
model: any={};
country: Country;
region: Region;

  constructor(public httpService: HttpService) { }

  ngOnInit() {

    this.httpService.getCountries().subscribe(
       (conts: any) => {
                this.countries = conts;
                //console.log(this.countries)
              },
        error => {
            alert("Unsuccessful fetch operation!");
            console.log(error);
        }
    );

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
  }

  deleteRegion(regionId: number) 
  {
    this.regions.forEach(element => {
      if(element.Id == regionId)
      {
        this.region = element;
      }
    });

    this.httpService.deleteRegion(this.region).subscribe(
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

  editRegion(regionId: number)
  {
    this.regions.forEach(element => {
      if(element.Id == regionId)
      {
        this.region = element;
      }
    });

    this.model.Name = this.region.Name;
    this.model.CountryName = this.region.CountryName;

    console.log(this.region.Id + " "+ this.region.Name + " "+this.region.CountryName);
 
  }

  updateRegion()
  {
      this.region.Name = this.model.Name;
      this.region.CountryName = this.model.CountryName;

      this.countries.forEach(element => {
        if(element.Name == this.region.CountryName)
        {
          this.region.CountryId = element.Id;
        }
      });


      this.httpService.putRegion(this.region).subscribe(
       (regs: any) => {
                // this.countries = conts;
                console.log(this.regions)
              },
        error => {
            alert("Unsuccessful put operation!");
            console.log(error);
        }
    );
  }

}
