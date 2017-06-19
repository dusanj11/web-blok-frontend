import { Component, OnInit, NgZone } from '@angular/core';
import { NotificationServiceWS } from "app/service/notification-service";
import { Accommodation } from "app/accommodation/accommodation";
import { HttpService } from "app/service/http-service";
import { AuthService } from "app/service/auth-service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  isConnected: Boolean;
  notifications: any[]; // **
  time: string;
  Manager: any;

  constructor(private notifService: NotificationServiceWS, private ngZone: NgZone,
    private httpService: HttpService, private authService: AuthService) {
    this.isConnected = false;
    this.notifications = [];

    this.ngZone = new NgZone({ enableLongStackTrace: false });
  }


  ngOnInit() {
    this.checkConnection();
    this.subscribeForNotifications();
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
    let Notification: any = {};

    this.ngZone.run(() => {
      let token = this.authService.currentUserToken();
      this.httpService.getUserById(notif.AppUserId, token).subscribe(
        (res: any) => {
          this.Manager = res;
          Notification.accommodation = notif;
          Notification.manager = this.Manager;
          console.log("Notification received");
          this.notifications.push(Notification);

        },
        error => {
          console.log(error);
        }
      );


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
    this.notifService.GetNotification();
  }

  public startTimer() {
    this.notifService.StartTimer();
  }

  public stopTimer() {
    this.notifService.StopTimer();
    this.time = "";
  }

  acceptAccommodation(id: number){
      console.log(`Notification approved: ${id}`);
  }
}
