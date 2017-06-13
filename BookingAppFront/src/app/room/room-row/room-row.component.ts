import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { Room } from '../room';

@Component({
  selector: 'app-room-row',
  templateUrl: './room-row.component.html',
  styleUrls: ['./room-row.component.css']
})
export class RoomRowComponent implements OnInit {

  constructor() { }

  @Input() room: Room;
  @HostBinding('attr.class') cssClass = 'item';

  ngOnInit() {
  }

}
