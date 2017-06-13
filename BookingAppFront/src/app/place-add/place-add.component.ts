import { Component, OnInit, Input } from '@angular/core';
import { RegionComponent } from "app/country/region/region.component";
import { Region } from "app/country/region/region";
import { HttpService } from "app/service/http-service";
import { NgForm } from "@angular/forms";
import { Place } from "app/place/place";


@Component({
  selector: 'app-place-add',
  templateUrl: './place-add.component.html',
  styleUrls: ['./place-add.component.css']
})
export class PlaceAddComponent implements OnInit {

@Input() placeRegs: Region[];

  constructor(public httpService: HttpService) {
   }

  ngOnInit() {
    this.httpService.getRegions().subscribe(
       (regs: any) => {
            this.placeRegs = regs;
            //console.log(this.regions);
          },
      error => {
          alert("Unsuccessful fetch operation!");
          console.log(error);
      }
    );
  }

  onSubmitPlace(plc: Place, form: NgForm) :void
  {
    this.placeRegs.forEach(element => {
      if(element.Name == plc.RegionName)
      {
        plc.RegionId = element.Id;
      }
      
    });
      this.httpService.postPlace(plc).subscribe(
      (conts: any) => {
                //console.log(this.conts);
              },
        error => {
            alert("Unsuccessful post operation!");
            console.log(error);
        }
    );
  }

}
