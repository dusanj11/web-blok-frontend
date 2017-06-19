import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from "app/service/auth-service";
import { NotificationServiceWS } from "app/service/notification-service";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {


  constructor(private authService: AuthService, private notifService: NotificationServiceWS) {

   }

   isLoggedInManager(): boolean {
      return this.authService.isLoggedInRole("Manager");
   }

   notify(){
      this.notifService.GetNotification();
   }

  ngOnInit() {
  }

}
