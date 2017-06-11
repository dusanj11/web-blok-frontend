import { Component, OnInit, Input } from '@angular/core';
import { Country } from "app/country/country";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-region-add',
  templateUrl: './region-add.component.html',
  styleUrls: ['./region-add.component.css']
})
export class RegionAddComponent implements OnInit {

stateCtrl: FormControl = new FormControl();
@Input() regCountries : Country[];

  constructor() { }

  ngOnInit() {
  }

}
