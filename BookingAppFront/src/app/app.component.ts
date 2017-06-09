import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from './service/http-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService]
})
export class AppComponent {

  constructor(public httpService: HttpService){}

  registerResponse: any;


  // metoda vrsi registraciju novog korisnika
  onSubmitRegister(user: any, form: NgForm){
    console.log(user);
    this.httpService.registerUser(user).subscribe(this.onPost);
  }

  // metoda koja gadja oauth/token url kako bi dobila token za korisnika
  // TODO: potrebno je nekako sacuvati token 
  onSubmitSignIn(user: any, form: NgForm){
    console.log(user);
    this.httpService.signInUser(user).subscribe(
      (res: any) => {this.registerResponse = res; console.log(this.registerResponse)},
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );
  }

  onPost(res : any) : void{
    alert("Post!");

  }
}
