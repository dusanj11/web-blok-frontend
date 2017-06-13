import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Accommodation } from '../accommodation';
import { HttpService } from '../../service/http-service';


@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']
})
export class AccommodationDetailsComponent implements OnInit {

  id: number;
  accommodation: Accommodation;

  constructor( private router: Router, private activatedRoute: ActivatedRoute,
                private httpService: HttpService ) {
      activatedRoute.params.subscribe(params => {this.id = params['id'];
      this.accommodation = new Accommodation(0,"", "", "", null,null,null,"", true, 0,0,0 ); 
    });
  }

  // sa servera treba da dobavi podatke o smestaju sa id koji je prosledjen propertijem this.id
  ngOnInit() {
    console.log("Accommodation Details: " + this.id);
    // console.log("LogIn " + localStorage.getItem('currentUser'));
    this.httpService.getAccommodationDetails(this.id).subscribe(
      (res: Accommodation) => {
            console.log(res);
            this.accommodation = res;
      },
      error => {
            console.log(error);
      }

    );
  }



}
