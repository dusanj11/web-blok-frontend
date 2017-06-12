import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http-service';
import { NgForm } from '@angular/forms';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  
})
export class SignInComponent implements OnInit {

  constructor(public httpService: HttpService, private router: Router, private activatedRoute: ActivatedRoute) { }

  registerResponse: any;

  // metoda koja gadja oauth/token url kako bi dobila token za korisnika
  // TODO: potrebno je nekako sacuvati token
  onSubmitSignIn(user: any, form: NgForm){
    console.log("User data " + user);
    this.httpService.signInUser(user).subscribe(
      (res: any) => {
                        this.registerResponse = res;
                        let data = res.json();
                        //console.log(data.access_token);
                        // console.log("User");
                        // console.log(user);

                        if ( data && data.access_token) {
                            // postoji token, tako da postoji registrovan korisnik
                            // smestanje tokena na localstorage

                            let userData = this.httpService.getUserInfo(user.username, data.access_token).subscribe(res => console.log(res));
                            // console.log(userData);
                            // localStorage.setItem('currentUser', JSON.stringify(user));
                            // console.log(localStorage.getItem('currentUser'));
                        }
                    },
      error => {
                  alert("Unsuccessful fetch operation!");
                  console.log(error);
               }

    );

    //   (res: any) =>
    //           {
    //               this.registerResponse = res;
    //               console.log(this.registerResponse);
    //               //console.log(res.headers.get("Role"));
    //           },
    //   error => {alert("Unsuccessful fetch operation!"); console.log(error);}
    // );

  }

  ngOnInit() {
  }

}
