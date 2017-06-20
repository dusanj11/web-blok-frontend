import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms/forms";
import { NotificationService } from "ng2-notify-popup";
import { AuthService } from "app/service/auth-service";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  constructor(private authService: AuthService, private notifService: NotificationService) { }

  ngOnInit() {
  }

  onSubmitChangePass(pass: any, ngForm: NgForm) {
    let token: string = this.authService.currentUserToken();
    this.authService.changePassword(pass.currentPassword, pass.newPassword, pass.confirmPassword, token).subscribe(
      (res: any) => {
        this.notifService.show("Successfully changed password!", { type: 'error', position: 'bottom' });
      },
      error => {
        this.notifService.show("Passwords must have at least one non letter or digit character. Passwords must have at least one uppercase ('A'-'Z')", { type: 'error', position: 'bottom' });
      }
    );
  }

}
