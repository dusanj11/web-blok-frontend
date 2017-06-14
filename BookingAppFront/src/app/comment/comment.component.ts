import { Component, OnInit, Input } from '@angular/core';
import { Comment } from './comment';
import { NgForm } from '@angular/forms';
import { HttpService } from "app/service/http-service";
import { AuthService } from "app/service/auth-service";


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  comments: Comment[];

  @Input() id: number;

  enabled: boolean;

  // konstrutkor inicijalizuje listu komentara za odredjeni smestaj
  constructor(public httpService: HttpService, public authService: AuthService) {
      this.comments = [
        new Comment(
                    1,
                    4,
                    "Odlican smestaj, svaka preporuka",
                    2,
                    2),
        new Comment(
                    1,
                    4,
                    "Odlican smestaj, svaka preporuka",
                    2,
                    2),
        new Comment(
                    1,
                    4,
                    "Odlican smestaj, svaka preporuka",
                    2,
                    2),
        new Comment(
                    1,
                    4,
                    "Odlican smestaj, svaka preporuka",
                    2,
                    2)
      ]
   }


  enableToComment():boolean {

    let username: string = this.authService.currentUserName();
    this.httpService.checkIfReservationPass(username, this.id).subscribe(
      (res: any) => {
          if (res._body == "true")
            this.enabled = true;
          else
            this.enabled = false;
      },
      error => {
          console.log(error);
          this.enabled = false;
      }
    );

    if (this.enabled == true)
      return true;
    else 
      return false;

  
  } 

  ngOnInit() {
    console.log("Id smestaja za komentar: " + this.id);
  }

}
