import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']
})
export class AccommodationDetailsComponent implements OnInit {

  id: string;

  constructor( private router: Router, private activatedRoute: ActivatedRoute) {
      activatedRoute.params.subscribe(params => {this.id = params['id']; });
  }

  // sa servera treba da dobavi podatke o smestaju sa id koji je prosledjen propertijem this.id
  ngOnInit() {
    console.log("Accommodation Details: " + this.id);
    console.log("LogIn " + localStorage.getItem('currentUser'));
  }



}
