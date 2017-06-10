import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Accommodation } from '../accommodation';


@Component({
  selector: 'app-accommodation-row',
  templateUrl: './accommodation-row.component.html',
  styleUrls: ['./accommodation-row.component.css']
})
export class AccommodationRowComponent implements OnInit {

  @Input() accommodation: Accommodation;

  constructor() { }

  ngOnInit() {
  }

}
