import { Component, OnInit, Input } from '@angular/core';
import { RegionComponent } from "app/country/region/region.component";
import { Region } from "app/country/region/region";
import { HttpService } from "app/service/http-service";
import { NgForm } from "@angular/forms";
import { Place } from "app/place/place";
import { AdminService } from "app/service/admin-service";
import { AuthService } from "app/service/auth-service";
import { NotificationService } from "ng2-notify-popup";
import { Router } from "@angular/router";


@Component({
  selector: 'app-place-add',
  templateUrl: './place-add.component.html',
  styleUrls: ['./place-add.component.css']
})
export class PlaceAddComponent implements OnInit {

@Input() placeRegs: Region[];

  constructor(private router: Router, private notifService: NotificationService, private adminService: AdminService, private authService: AuthService) {
   }

  ngOnInit() {
    this.adminService.getRegions().subscribe(
       (regs: any) => {
            this.placeRegs = regs;
            //console.log(this.regions);
          },
      error => {
          // alert("Unsuccessful fetch operation!");
          this.notifService.show("Error fetching regions!", {type: 'error', position:'bottom'});

          console.log(error);
      }
    );
  }

  onSubmitPlace(plc: Place, form: NgForm) :void
  {
    this.placeRegs.forEach(element => {
      if(element.Name == plc.RegionName)
      {
        plc.RegionId = element.Id;
      }
      
    });
      let access_token: string = this.authService.currentUserToken();

      this.adminService.postPlace(plc, access_token).subscribe(
      (conts: any) => {
                //console.log(this.conts);
                this.notifService.show("Successfully added new region!", {type: 'success', position:'bottom'});
                this.router.navigate(['/administration']);
              },
        error => {
            // alert("Unsuccessful post operation!");
            this.notifService.show("Error adding region!", {type: 'error', position:'bottom'});

            console.log(error);
        }
    );
  }

}
