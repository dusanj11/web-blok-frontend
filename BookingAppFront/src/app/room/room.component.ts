import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../service/http-service';
import { Room } from './room';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  @Input() accommodationId: number;

  rooms: Room[];

  constructor(private httpService: HttpService) {
      this.rooms = [];
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
