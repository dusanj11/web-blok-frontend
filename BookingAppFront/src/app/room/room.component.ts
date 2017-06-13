import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../service/http-service';
import { Room } from './room';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  @Input() accommodationId: number;

  @Output() onRoomSelected: EventEmitter<Room>;

  rooms: Room[];

  selectedRoom: Room;

  constructor(private httpService: HttpService) {
      this.rooms = [];
      this.onRoomSelected = new EventEmitter();
   }

  clicked(room: Room): void {
      this.selectedRoom = room;
      this.onRoomSelected.emit(room);

      console.log("Selected room");
      console.log(this.selectedRoom);
  }

  isSelected(room: Room): boolean {
      if (!room || !this.selectedRoom) {
            return false;
      }
      return room.Id === this.selectedRoom.Id;
  }

  ngOnInit() {
      this.httpService.getRoomsForAccommodation(this.accommodationId).subscribe(
          (res: Room[]) => {
                this.rooms = res;
                console.log(res);
          },
          error => {
                console.log(error);
          }
      );
  }

}
