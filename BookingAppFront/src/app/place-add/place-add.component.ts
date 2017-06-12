import { Component, OnInit, Input } from '@angular/core';
import { RegionComponent } from "app/country/region/region.component";
import { Region } from "app/country/region/region";
import { HttpService } from "app/service/http-service";


@Component({
  selector: 'app-place-add',
  templateUrl: './place-add.component.html',
  styleUrls: ['./place-add.component.css']
})
export class PlaceAddComponent implements OnInit {

@Input() placeRegs: Region[];
httpService: HttpService;
  constructor() {
    let rm = new RegionComponent(this.httpService);
    this.placeRegs = rm.regions;
   }

  ngOnInit() {
  }

}
