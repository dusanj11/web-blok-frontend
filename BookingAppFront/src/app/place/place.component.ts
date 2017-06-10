import { Component, OnInit } from '@angular/core';
import { Place } from './place';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {

  places: Place[];

  constructor() {
    this.places = [
      new Place(1,"Novi Sad", 1),
      new Place(2,"Beograd", 2),
      new Place(3,"Nis", 2),
      new Place(4,"Skopje", 3),
      new Place(5,"Berovo", 3),
      new Place(6,"Sarajevo", 4)
    ];
  }

  ngOnInit() {
  }

}
