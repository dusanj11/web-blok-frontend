import { Component, OnInit, Input } from '@angular/core';
import { Country } from '../country';
import {Region} from './region';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {

  regions: Region[];
  @Input() regCountry : number;

  constructor() 
  {
      this.regions = [
      new Region(1,"Vojvodina", 1),
      new Region(2,"Juzna Srbija", 1),
      new Region(3,"Zapadna Bosna", 2),
      new Region(4,"Centralna Makedonija", 3),
      new Region(5,"Istocna Makedonija", 3),
    ];

   }

  ngOnInit() {
  }

}
