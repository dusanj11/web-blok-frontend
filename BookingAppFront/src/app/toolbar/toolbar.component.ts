import { Component, OnInit, Input } from '@angular/core';
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

  @Input() admin: boolean;

  constructor( private router: Router,
               private activatedRoute: ActivatedRoute) {  }

  ngOnInit() {
      let user = localStorage.getItem('currentUser');
      // if ( user && user.access_token ) {
      //     // korisnik se logovao proveri
      //
      // }
      // else {
      //
      // }

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
