import { Component, OnInit, Input } from '@angular/core';
import { MdNativeDateModule } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Room } from "app/room/room";
import { HttpService } from "app/service/http-service";
import { RoomReservation } from "app/room-reservation/room-reservation";
import { CurrentUser } from "app/model/current-user";
import { AuthService } from "app/service/auth-service";

@Component({
  selector: 'app-room-reservation',
  templateUrl: './room-reservation.component.html',
  styleUrls: ['./room-reservation.component.css']
})
export class RoomReservationComponent implements OnInit {

  @Input() accommodationId: number;

  startDate: any;

  endDate: any;

  selectedRoom: Room;

  reservation: RoomReservation;

  constructor(private httpService: HttpService, private authService: AuthService) {
      this.selectedRoom = new Room();
      this.selectedRoom.RoomNumber = -1;
   }

   roomWasSelected(room: Room) {
     console.log("Slected Room Marko");
     console.log(room);

     this.selectedRoom = room;
   }

   

  //  onSubmitReservation(reservation: any, form: NgForm){
  //     console.log("Room reservation ***");
  //     console.log(reservation);
  //  }

  onSubmitReservation(){
    console.log('Start date End date**');
    console.log(this.startDate);
    console.log(this.endDate);

    

    this.reservation = new RoomReservation();
    this.reservation.RoomId = this.selectedRoom.Id;
    this.reservation.AppUserId = this.authService.currentUserId();
    this.reservation.StartDate = this.startDate;
    this.reservation.EndDate = this.endDate;
    
    let access_token: string = this.authService.currentUserToken();

    this.httpService.createReservation(this.reservation, access_token).subscribe(
        (res: any) => {
            console.log("Reservation successfully created");
        },
        error => {
            console.log(error);
        }
    );

  }

  ngOnInit() {
  }

}
