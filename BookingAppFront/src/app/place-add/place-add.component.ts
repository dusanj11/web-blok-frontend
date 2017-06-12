import { Component, OnInit, Input } from '@angular/core';
import { RegionComponent } from "app/country/region/region.component";
import { Region } from "app/country/region/region";


@Component({
  selector: 'app-place-add',
  templateUrl: './place-add.component.html',
  styleUrls: ['./place-add.component.css']
})
export class PlaceAddComponent implements OnInit {

@Input() placeRegs: Region[];

  constructor() {
    let rm = new RegionComponent();
    this.placeRegs = rm.regions;
   }

  ngOnInit() {
  }

}
