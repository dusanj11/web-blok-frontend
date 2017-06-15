import { Component, OnInit, Input } from '@angular/core';
import { Comment } from './comment';
import { NgForm } from '@angular/forms';
import { HttpService } from "app/service/http-service";
import { AuthService } from "app/service/auth-service";
import { IStarRatingIOnHoverRatingChangeEvent, IStarRatingOnClickEvent, IStarRatingOnRatingChangeEven } from "angular-star-rating";


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
 
  comments: Comment[];

  @Input() id: number;

  enabled: boolean;

  onClickResult: IStarRatingOnClickEvent;
  onHoverRatingChangeResult: IStarRatingIOnHoverRatingChangeEvent;
  onRatingChangeResult: IStarRatingOnRatingChangeEven;



  // konstrutkor inicijalizuje listu komentara za odredjeni smestaj
  constructor(public httpService: HttpService, public authService: AuthService) {
    this.comments = [];
    // this.comments = [
    //   new Comment(
    //               1,
    //               4,
    //               "Odlican smestaj, svaka preporuka",
    //               2,
    //               2),
    //   new Comment(
    //               1,
    //               4,
    //               "Odlican smestaj, svaka preporuka",
    //               2,
    //               2),
    //   new Comment(
    //               1,
    //               4,
    //               "Odlican smestaj, svaka preporuka",
    //               2,
    //               2),
    //   new Comment(
    //               1,
    //               4,
    //               "Odlican smestaj, svaka preporuka",
    //               2,
    //               2)
    // ]
  }

  onClick = ($event: IStarRatingOnClickEvent) => {
    console.log('onClick $event: ', $event);
    this.onClickResult = $event;
  };

  onRatingChange = ($event: IStarRatingOnRatingChangeEven) => {
    console.log('onRatingUpdated $event: ', $event);
    this.onRatingChangeResult = $event;
  };

  onHoverRatingChange = ($event: IStarRatingIOnHoverRatingChangeEvent) => {
    console.log('onHoverRatingChange $event: ', $event);
    this.onHoverRatingChangeResult = $event;
  };

  onSubmitAddComment(comment: Comment, ngForm: NgForm){
    console.log("Comment");
    comment.Grade = this.onClickResult.rating;
    comment.AppUserId = this.authService.currentUserId();
    comment.AccomodationId = this.id;
    console.log(comment);

    this.httpService.createComment(comment).subscribe(
      (res: any) => {
          alert("Uspesno dodat komentar");
      },
      error => {
          console.log(error);
      }
    );
  }

  enableToComment(): boolean {

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
    
    this.httpService.getAccommodationComments(this.id).subscribe(
      (res: any) => {
          // this.comments = res;
          this.comments = JSON.parse(res._body);
          console.log(res);
      },
      error => {
          console.log(error);
      }
    );
  }

}
