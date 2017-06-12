import { Component, OnInit, Input} from '@angular/core';
import { Place } from './place';
import { HttpService } from "app/service/http-service";

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {

  places: Place[];
  @Input() placeReg : number;

  constructor(public httpService: HttpService) {
    this.places = [
      new Place(1,"Novi Sad", 1),
      new Place(2,"Beograd", 2),
      new Place(3,"Nis", 2),
      new Place(4,"Skopje", 4),
      new Place(5,"Berovo", 5),
      new Place(6,"Sarajevo", 3)
    ];
  }

  ngOnInit() {
    // this.httpService.getPlaces().subscribe(
    //    (plcs: any) => {this.places = plcs; console.log(this.places)},//You can set the type to Product.
    //   error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    // );
  }

}
