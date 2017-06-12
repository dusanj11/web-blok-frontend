import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http-service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [HttpService]
})
export class RegisterComponent implements OnInit {

    response: any;

    constructor(public httpService: HttpService){}

    // metoda vrsi registraciju novog korisnika
    onSubmitRegister(user: any, form: NgForm){
      console.log(user);
      this.httpService.registerUser(user).subscribe(this.onPost);
      // this.httpService.registerAppUser(user).subscribe(
      //   (res: any) => {
      //       this.response = res;
      //       console.log("AppUser created successfully "+ this.response);
      //       this.httpService.registerUser(user).subscribe(this.onPost);
      //   },
      //   error => {
      //
      //       console.log("ERROR " + error);
      //   }
      // );

    }

    onPost(res : any) : void{
      console.log("AddUser");
    }

    ngOnInit() {
    }
}
