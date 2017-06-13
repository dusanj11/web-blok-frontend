import { Component, OnInit, Input, Injectable } from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { CurrentUser } from '../model/current-user';
import { AuthService } from "app/service/auth-service";

@Injectable()
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {

  @Input() admin: boolean;
  user: CurrentUser;

  constructor( private router: Router,
               private activatedRoute: ActivatedRoute,
               private authService: AuthService) {  }


  checkIfAdminManager(): boolean {
    //  let user = sessionStorage.getItem("currentUser");

    //   let userR = JSON.parse(user);
    //   console.log("CurrentUser***");
    //   console.log(userR);
    //   if ( userR ) {
    //       if ( userR.role == "Admin"){
    //         return true;
    //       }
    //       else
    //       {
    //         return false;
    //       }
    //   }
    //   else {
    //     return false;
    //   }
        return this.authService.isLoggedInRole("Admin") || this.authService.isLoggedInRole("Manager");
  }

  isLoggedIn(): boolean {
      return !this.authService.isLoggedIn();
  }

  isLoggedOut(): boolean {
      return !this.authService.isLoggedOut();
  }

  goLogIn()
  {
    this.router.navigate(['/signIn']);
  }

  goLogOut(){
    this.authService.logOut();
    this.router.navigate(['/accommodation']);
  }

goAdministrate()
  {
    this.router.navigate(['/administration']);
  }

  goAccommodation(){
    this.router.navigate(['/accommodation']);
  }

  
  ngOnInit() {
      

  }

}
