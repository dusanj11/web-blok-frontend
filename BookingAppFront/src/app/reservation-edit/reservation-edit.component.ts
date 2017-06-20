import { Component, OnInit } from '@angular/core';
import { RoomReservation } from "app/room-reservation/room-reservation";
import { AuthService } from "app/service/auth-service";
import { HttpService } from "app/service/http-service";
import { NotificationService } from "ng2-notify-popup";

@Component({
  selector: 'app-reservation-edit',
  templateUrl: './reservation-edit.component.html',
  styleUrls: ['./reservation-edit.component.css']
})
export class ReservationEditComponent implements OnInit {

  roomReservations: any[];

  constructor(private httpService: HttpService, private authService: AuthService, 
              private notifService: NotificationService) { }

  ngOnInit() {

      let userId: number = this.authService.currentUserId();
      let token: string = this.authService.currentUserToken();
      this.httpService.getRoomReservations(userId, token).subscribe(
        (res: any) => {
            console.log(res);

            this.roomReservations = JSON.parse(res._body);
        },
        error => {
            console.log(error);
        } 
      );
  }

  deleteReservation(id: number){

      let token = this.authService.currentUserToken();
      this.httpService.deleteRoomReservation(id, token).subscribe(
        (res: any) => {
             this.notifService.show("Successfully removed reservation!", {type: 'success', position:'bottom'});
             this.ngOnInit();
        },
        error => {
              this.notifService.show("Error removing reservation!", {type: 'error', position:'bottom'});
        }
      );

      

  }

}
