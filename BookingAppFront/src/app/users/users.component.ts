import { Component, OnInit } from '@angular/core';
import { AdminService } from "app/service/admin-service";
import { AuthService } from "app/service/auth-service";
import { NotificationService } from "ng2-notify-popup";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  
  managers: any[];
  token: string;
 
  constructor(private adminService: AdminService, private authService: AuthService, 
              private notifService: NotificationService) { }

  ngOnInit() {
      this.token = this.authService.currentUserToken();
      this.adminService.getManagers(this.token).subscribe(
        (res: any) => {
            console.log("Managers");
            console.log(res);
            this.managers = JSON.parse(res._body);
        },
        error => {
          console.log(error);
        }
      );
  }

  AllowCreating(id: number){
      this.adminService.allowCreating(this.token, id).subscribe(
          (res: any) => {
              this.notifService.show("Manager is allowed to create accommodation!", {type: 'success', position:'bottom'});
          },
          error => {
              console.log(error);
          }
      );
  }

  PreventCreating(id: number){
      this.adminService.preventCreating(this.token, id).subscribe(
          (res: any) => {
              this.notifService.show("Manager is prevented from creating accommodation!", {type: 'success', position:'bottom'});
          },
          error => {
              console.log(error);
          }
      );
  }
}
