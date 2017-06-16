import { Component, OnInit } from '@angular/core';
import { Accommodation } from "app/accommodation/accommodation";
import { Room } from "app/room/room";
import { ManagerService } from "app/service/manager-service";
import { AuthService } from "app/service/auth-service";

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit {

  accommodations: Accommodation[];
  accommodaton: Accommodation;
  rooms: Room[];
  room: Room;
  model: any = {};

  constructor(private managerService: ManagerService,
              private authService: AuthService) { }

  ngOnInit() {

    this.managerService.getRooms().subscribe(
      (rms: any) => {
        this.rooms = rms;
        //console.log(this.countries)
        this.managerService.getAccommodation().subscribe(
          (accs: any) => {
            this.accommodations = accs;
            //console.log(this.countries)
            this.rooms.forEach(elementR => {

              this.accommodations.forEach(elementC => {

                if (elementR.AccomodationId == elementC.Id) {
                  elementR.AccommodationName = elementC.Name;
                }
              });
            });
          },
          error => {
            alert("Unsuccessful fetch operation!");
            console.log(error);
          }
        );
      },
      error => {
        alert("Unsuccessful fetch operation!");
        console.log(error);
      }
    );

  }

  deleteRoom(roomId: number)
  {
    this.rooms.forEach(element => {
      if (element.Id == roomId) {
        this.room = element;
      }
    });

    let access_token: string = this.authService.currentUserToken();
    
    this.managerService.deleteRoom(this.room, access_token).subscribe(
      (regs: any) => {
        // this.countries = conts;
        //console.log(this.countries)
      },
      error => {
        alert("Unsuccessful delete operation!");
        console.log(error);
      }
    );

  }

  editRoom(roomId: number)
    {
        this.rooms.forEach(element => {
      if (element.Id == roomId) {
        this.room = element;
      }
    });

    this.model.RoomNumber = this.room.RoomNumber;
    this.model.BedCount = this.room.BedCount;
    this.model.PricePerNight = this.room.PricePerNight;
    this.model.Description = this.room.Description;
    this.model.AccommodationName = this.room.AccommodationName;

  }
  
  updateRoom() {
    this.room.RoomNumber = this.model.RoomNumber;
    this.room.BedCount = this.model.BedCount;
    this.room.PricePerNight = this.model.PricePerNight;
    this.room.Description = this.model.Description;
    this.room.AccommodationName = this.model.AccommodationName;

    this.accommodations.forEach(element => {
      if (element.Name == this.room.AccommodationName) {
        this.room.AccomodationId = element.Id;
      }
    });

    let access_token: string = this.authService.currentUserToken();
    this.managerService.putRoom(this.room, access_token).subscribe(
      (regs: any) => {
        // this.countries = conts;
        console.log(this.rooms)
      },
      error => {
        alert("Unsuccessful put operation!");
        console.log(error);
      }
    );

    // this.ngOnInit();
  }

}
