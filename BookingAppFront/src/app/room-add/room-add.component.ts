import { Component, OnInit } from '@angular/core';
import { Room } from "app/room/room";
import { NgForm } from "@angular/forms";
import { Accommodation } from "app/accommodation/accommodation";
import { ManagerService } from "app/service/manager-service";
import { AuthService } from "app/service/auth-service";

@Component({
  selector: 'app-room-add',
  templateUrl: './room-add.component.html',
  styleUrls: ['./room-add.component.css']
})
export class RoomAddComponent implements OnInit {

  accommodations: Accommodation[];

  constructor(private managerService: ManagerService, private authService: AuthService) { }

  ngOnInit() {

    this.managerService.getAccommodation().subscribe(
       (accs: any) => {
                this.accommodations = accs;
                console.log(this.accommodations)
              },
        error => {
            alert("Unsuccessful fetch operation!");
            console.log(error);
        }
    );
  }

  onSubmitRoom(room: Room, form: NgForm) : void
  {
    this.accommodations.forEach(element =>
    {
        if(element.Name == room.AccommodationName)
        {
          room.AccomodationId = element.Id;
        }
    });

    let access_token: string = this.authService.currentUserToken();

    this.managerService.postRoom(room, access_token).subscribe(
      (conts: any) => {
                //console.log(this.conts);
              },
        error => {
            alert("Unsuccessful post operation!");
            console.log(error);
        }
    );
    
  }
}
