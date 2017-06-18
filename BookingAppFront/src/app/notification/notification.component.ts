import { Component, OnInit, NgZone } from '@angular/core';
import { NotificationService } from "app/service/notification-service";
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
  notifications: any[];
  time: string;

  constructor(private notifService: NotificationService, private ngZone: NgZone,
              private httpService: HttpService, private authService: AuthService) {
    this.isConnected = false;
    this.notifications = [];
  }


  ngOnInit() {
    this.checkConnection();
    this.subscribeForNotifications();
    this.subscribeForTime();
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

  public onNotification(notif: any) {
    let FullName: string;

    this.ngZone.run(() => {
      let token = this.authService.currentUserToken();
      this.httpService.getUserById(notif.AppUserId, token).subscribe(
        (res: any) => {
            FullName = res.FullName;
            notif.FullName = res.FullName;
        },
        error => {
            console.log(error);
        }
      );

      this.notifications.push(notif);
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

  public startTimer() {
    this.notifService.StartTimer();
  }

  public stopTimer() {
    this.notifService.StopTimer();
    this.time = "";
  }

  
}
