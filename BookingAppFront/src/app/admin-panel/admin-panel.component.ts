import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from "app/service/auth-service";
import { NotificationServiceWS } from "app/service/notification-service";
import { HttpService } from "app/service/http-service";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  allowed: boolean = false;

  constructor(private authService: AuthService, private notifService: NotificationServiceWS,
              private httpService: HttpService) {

   }

   isLoggedInManager(): boolean {
      return this.authService.isLoggedInRole("Manager");
   }

   notify(){
      this.notifService.GetNotification();
   }

  ngOnInit() {
      let userName: string = this.authService.currentUserName();
      let token: string = this.authService.currentUserToken();
      this.httpService.getUserInfo(userName, token).subscribe(
          (res: any) => {
              console.log(res);
              this.allowed = res.Allow;
          },
          error => {
              console.log(error);
          }
      );
  }

}
