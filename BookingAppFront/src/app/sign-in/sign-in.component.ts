import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http-service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [HttpService]
})
export class SignInComponent implements OnInit {

  constructor(public httpService: HttpService) { }

  registerResponse: any;

  // metoda koja gadja oauth/token url kako bi dobila token za korisnika
  // TODO: potrebno je nekako sacuvati token
  onSubmitSignIn(user: any, form: NgForm){
    console.log(user);
    this.httpService.signInUser(user).subscribe(
      (res: any) =>
              {
                  this.registerResponse = res;
                  console.log(this.registerResponse);
                  //console.log(res.headers.get("Role"));
              },
      error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    );


  }

  ngOnInit() {
  }

}
