import { Component, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor( private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  goLogIn()
  {
    this.router.navigate(['/signIn']);
  }

goAdministrate()
  {
    this.router.navigate(['/administration']);
  }

  goAccommodation(){
    this.router.navigate(['/accommodation']);
  }
}