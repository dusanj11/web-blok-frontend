import { Component, OnInit, Input } from '@angular/core';
import { Accommodation } from '../accommodation';


@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.css']
})
export class AccommodationListComponent implements OnInit {

  @Input() accommodationList: Accommodation[];

  constructor() { }

  ngOnInit() {
  }

}
