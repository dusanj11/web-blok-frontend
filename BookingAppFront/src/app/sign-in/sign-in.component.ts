import { Component, OnInit, Injectable, NgZone } from '@angular/core';
import { HttpService } from '../service/http-service';
import { NgForm } from '@angular/forms';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { CurrentUser } from '../model/current-user';
import { AuthService } from "app/service/auth-service";
import { NotificationServiceWS } from "app/service/notification-service";
import { NotificationService } from "ng2-notify-popup";
import { NotificationComponent } from "app/notification/notification.component";
import { Accommodation } from "app/accommodation/accommodation";

@Injectable()
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {

  ngZone: NgZone;

  constructor(private notifyService: NotificationService,
              public httpService: HttpService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private notifService: NotificationServiceWS) {

                this.ngZone = new NgZone({enableLongStackTrace: false});
               }

  registerResponse: any;

  // metoda koja gadja oauth/token url kako bi dobila token za korisnika
  // TODO: potrebno je nekako sacuvati token
  onSubmitSignIn(user: any, form: NgForm){
    console.log("User data " + user);
    this.httpService.signInUser(user).subscribe(
      (res: any) => {
                        this.registerResponse = res;
                        let data = res.json();
                        let role = res.headers.get("role");

                        if ( data && data.access_token) {
                            // postoji token, tako da postoji registrovan korisnik
                            // smestanje tokena na localstorage

                            this.httpService.getUserInfo(user.username, data.access_token).subscribe(
                                res => {
                                  // console.log(res);
                                  let currentUser: CurrentUser;
                                  currentUser = new CurrentUser(res.UserName,
                                                                res.FullName,
                                                                role,
                                                                data.access_token,
                                                                res.Id);



                                  console.log(currentUser);
                                  //localStorage.setItem('currentUser', JSON.stringify(currentUser));
                                  //sessionStorage.setItem('currentUser',JSON.stringify(currentUser));
                                  this.authService.logIn(currentUser);
                                  
                                  this.notifService.RegisterForNotifications();

                                  this.notifService.GetNotification();
                                  
                                   this.subscribeForApprovedNotification();
                                  // subscribovanje na dobijanje notifikacije 
                                  // this.notifService.OnConnected();

                                  // // .subscribe(
                                  // //     (res: any) => {
                                  // //         console.log(res);
                                  // //     },
                                  // //     error => {
                                  // //         console.log(error);
                                  // //     }

                                  // // );
                                  this.router.navigate(['/accommodation']);
                                }
                            );
                            // console.log(userData);
                            // localStorage.setItem('currentUser', JSON.stringify(user));
                            // console.log(localStorage.getItem('currentUser'));


                        }
                    },
      error => {
                  // alert("Unsuccessful fetch operation!");
                  this.notifyService.show("Error fetching user information!", {type: 'error', position:'bottom'});

                  console.log(error);
               }

    );

    //   (res: any) =>
    //           {
    //               this.registerResponse = res;
    //               console.log(this.registerResponse);
    //               //console.log(res.headers.get("Role"));
    //           },
    //   error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    // );

  }

  ngOnInit() {
    // this.subscribeForApprovedNotification();
  }

  private subscribeForApprovedNotification() {
    this.notifService.approvedAccommodationRecieved.subscribe(e => this.onApprovedNotification(e));
  }

  public onApprovedNotification(notif: Accommodation) {

    this.ngZone.run(() => {
      // this.approvedNotifications.push(notif);
      // console.log("Approved notification received");
      this.notifyService.show("Accommodation approved from administrator!", { type: 'info', position: 'bottom' });
    });
  }
}
