import { Component, OnInit, Input } from '@angular/core';
import { Country } from '../country';
import {Region} from './region';
import { HttpService } from "app/service/http-service";
import { AdminService } from "app/service/admin-service";
import { NotificationService } from "ng2-notify-popup";

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {

  regions: Region[];
  @Input() regCountry : number;

  constructor(private notifService: NotificationService, private httpService: HttpService, private adminService: AdminService)
  {
    //   this.regions = [
    //   new Region(1,"Vojvodina", 1),
    //   new Region(2,"Juzna Srbija", 1),
    //   new Region(3,"Zapadna Bosna", 2),
    //   new Region(4,"Centralna Makedonija", 3),
    //   new Region(5,"Istocna Makedonija", 3),
    // ];


   }

  ngOnInit() {
    this.adminService.getRegions().subscribe(
       (regs: any) => {
            this.regions = regs;
            //console.log(this.regions);
          },
      error => {
          //alert("Unsuccessful fetch operation!");
          this.notifService.show("Error fetching regions!", {type: 'error', position:'bottom'});
          console.log(error);
      }
    );
  }

}
