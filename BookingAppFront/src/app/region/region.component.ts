import { Component, OnInit, Output } from '@angular/core';
import {Region} from './region';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {

  @Output() regions: Region[];

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
