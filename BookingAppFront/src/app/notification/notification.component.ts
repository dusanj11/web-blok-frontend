import { Component, OnInit, NgZone } from '@angular/core';
import { NotificationServiceWS } from "app/service/notification-service";
import { Accommodation } from "app/accommodation/accommodation";
import { HttpService } from "app/service/http-service";
import { AuthService } from "app/service/auth-service";
import { AdminService } from "app/service/admin-service";
import { NotificationService } from "ng2-notify-popup";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  admin: boolean;
  manager: boolean;
  isConnected: Boolean = false;
  notifications: any[] = []; // **
  approvedNotifications: any[] = [];
  time: string;
  Manager: any;
  ngZone: NgZone;

  constructor(private notifService: NotificationServiceWS,
    private httpService: HttpService, private authService: AuthService,
    private adminService: AdminService, private notificationService: NotificationService) {
    // this.isConnected = false;
    // this.notifications = [];

    this.ngZone = new NgZone({ enableLongStackTrace: false });
  }


  ngOnInit() {
    this.admin = this.authService.isLoggedInRole("Admin");
    this.manager = this.authService.isLoggedInRole("Manager");
    this.checkConnection();
    this.subscribeForNotifications();
    this.subscribeForApprovedNotification();

    this.subscribeForTime();
    this.GetNotification();
  }


  private checkConnection() {
    this.notifService.connectionEstablished.subscribe(e => {
      this.isConnected = e;
      if (e) {
        this.notifService.sendHello()
      }
    });
  }

  private subscribeForNotifications() {
    this.notifService.notificationReceived.subscribe(e => this.onNotification(e));
  }

  public onNotification(notif: Accommodation) { // * 
    //let Manager: any = {};
    // let Notification: any = {};

    this.ngZone.run(() => {
      // let token = this.authService.currentUserToken();
      // this.httpService.getUserById(notif.AppUserId, token).subscribe(
      //   (res: any) => {
      //     this.Manager = res;
      //     Notification.accommodation = notif;
      //     Notification.manager = this.Manager;
      //     console.log("Notification received");
      //     this.notifications.push(Notification);

      //   },
      //   error => {
      //     console.log(error);
      //   }
      // );
      this.notifications.push(notif);
      console.log("Notification received");
    });
  }

  private subscribeForApprovedNotification() {
    this.notifService.approvedAccommodationRecieved.subscribe(e => this.onApprovedNotification(e));
  }

  public onApprovedNotification(notif: Accommodation) {

    this.ngZone.run(() => {
      // this.approvedNotifications.push(notif);
      // console.log("Approved notification received");
      this.notificationService.show("Accommodation approved!", { type: 'success', position: 'bottom' });
    });
  }

  subscribeForTime() {
    this.notifService.timeReceived.subscribe(e => this.onTimeEvent(e));
  }

  public onTimeEvent(time: string) {
    this.ngZone.run(() => {
      this.time = time;
    });
  }

  // public onClick() {
  //   if (this.isConnected) {
  //     this.http.click().subscribe(data => console.log(data));
  //   }
  // }
  public GetNotification() {
    console.log("GetNotification");
    this.notifService.GetNotification();
  }

  public startTimer() {
    this.notifService.StartTimer();
  }

  public stopTimer() {
    this.notifService.StopTimer();
    this.time = "";
  }

  acceptAccommodation(id: number) {
    // this.notifications.forEach(element => {
    //     if (element.id == id){

    //     }
    // });

    console.log(`Notification approved: ${id}`);
    let role = this.authService.currentUserRole();
    console.log(role);
    let token = this.authService.currentUserToken();
    this.adminService.approveAccommodation(id, token).subscribe(
      (res: any) => {
        this.notificationService.show("Accommodation approved!", { type: 'success', position: 'bottom' });
        this.ngOnInit();
      }
    );
  }
}
