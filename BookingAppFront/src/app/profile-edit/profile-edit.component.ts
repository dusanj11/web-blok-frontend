import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms/forms";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmitChangePass(pass: any, ngForm: NgForm){
      console.log(pass);
  }

}
