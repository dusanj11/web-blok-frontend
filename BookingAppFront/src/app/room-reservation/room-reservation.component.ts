import { Component, OnInit, Input } from '@angular/core';
import { MdNativeDateModule } from '@angular/material';
import { Room } from "app/room/room";

@Component({
  selector: 'app-room-reservation',
  templateUrl: './room-reservation.component.html',
  styleUrls: ['./room-reservation.component.css']
})
export class RoomReservationComponent implements OnInit {

  @Input() accommodationId: number;

  selectedRoom: Room;

  constructor() {
      this.selectedRoom = new Room();
      this.selectedRoom.RoomNumber = -1;
   }

   roomWasSelected(room: Room) {
     console.log("Slected Room Marko");
     console.log(room);

     this.selectedRoom = room;
   }


  ngOnInit() {
  }

}
