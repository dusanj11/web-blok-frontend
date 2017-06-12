import { Component, OnInit, Input } from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { CurrentUser } from '../model/current-user';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input() admin: boolean;
  user: CurrentUser;

  constructor( private router: Router,
               private activatedRoute: ActivatedRoute) {  }

  ngOnInit() {
      let user = localStorage.getItem("currentUser");

      let userR = JSON.parse(user);
      console.log("CurrentUser***");
      console.log(userR);
      if ( userR ) {
          if ( userR.role == "Admin"){
            this.admin = true;
          }
          else
          {
            this.admin = false;
          }
      }
      else {
        this.admin = false;
      }

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
