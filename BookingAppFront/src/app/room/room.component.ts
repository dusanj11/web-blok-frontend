import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../service/http-service';
import { Room } from './room';
import { ManagerService } from "app/service/manager-service";
import { NotificationService } from "ng2-notify-popup";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  @Input() accommodationId: number;

  @Output() onRoomSelected: EventEmitter<Room>;

  rooms: Room[];
  model: any ={};

  selectedRoom: Room;

  constructor(private notifService: NotificationService, private httpService: HttpService, private managerService: ManagerService) {
      this.rooms = [];
      this.onRoomSelected = new EventEmitter();
      this.model.BedCount = 0;
      this.model.Description ="";
      this.model.MinPrice = 0;
      this.model.MaxPrice = 100000;
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
      this.managerService.getRoomsForAccommodation(this.accommodationId).subscribe(
          (res: Room[]) => {
                this.rooms = res;
                console.log(res);
          },
          error => {
                console.log(error);
                this.notifService.show("Error fetching rooms for accommodation!", {type: 'error', position:'bottom'});

          }
      );
  }

  doBedCountFilter()
  {
        this.httpService.getBedCountFiltered(this.model.BedCount).subscribe(
       (rs: any) => {
            this.rooms = JSON.parse(rs._body);
            console.log(this.rooms);
          },
      error => {
        //   alert("Unsuccessful fetch operation!");
        this.notifService.show("Error fetchinging filtered rooms!", {type: 'error', position:'bottom'});

          console.log(error);
      }
    );
  }

  doDescriptionFilter()
  {
      this.httpService.getDescriptionRoomsFiltered(this.model.Description).subscribe(
       (rs: any) => {
            this.rooms = JSON.parse(rs._body);
            console.log(this.rooms);
          },
      error => {
        //   alert("Unsuccessful fetch operation!");
         this.notifService.show("Error fetchinging filtered rooms!", {type: 'error', position:'bottom'});

          console.log(error);
      }
    );
  }

  doPriceFilter()
  {
      this.httpService.getPriceFiltered(this.model.MinPrice, this.model.MaxPrice).subscribe(
       (rs: any) => {
            this.rooms = JSON.parse(rs._body);
            console.log(this.rooms);
          },
      error => {
        //   alert("Unsuccessful fetch operation!");
        this.notifService.show("Error fetchinging filtered rooms!", {type: 'error', position:'bottom'});

          console.log(error);
      }
    );
  }

}
