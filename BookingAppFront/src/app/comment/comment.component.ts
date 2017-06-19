import { Component, OnInit, Input } from '@angular/core';
import { Comment } from './comment';
import { NgForm } from '@angular/forms';
import { HttpService } from "app/service/http-service";
import { AuthService } from "app/service/auth-service";
import { IStarRatingIOnHoverRatingChangeEvent, IStarRatingOnClickEvent, IStarRatingOnRatingChangeEven } from "angular-star-rating";
import { NotificationService } from "ng2-notify-popup";


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
  constructor(private notifService: NotificationService, public httpService: HttpService, public authService: AuthService) {
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

    let access_token: string = this.authService.currentUserToken();

    this.httpService.createComment(comment, access_token).subscribe(
      (res: any) => {
        this.notifService.show("Successfully added new comment!", {type: 'success', position:'bottom'});

         // alert("Uspesno dodat komentar");
      },
      error => {
          console.log(error);
          this.notifService.show("Error adding new comment!", {type: 'error', position:'bottom'});

      }
    );
  }

  enableToComment(){
    console.log("Provera dozvole ostavljanja komentara");
    let username: string = this.authService.currentUserName();
    this.httpService.checkIfReservationPass(username, this.id).subscribe(
      (res: any) => {
          if (res._body == "true")
          {
            console.log("Enable to comment: true");
            this.enabled = true;
          }
          else{

             console.log("Enable to comment: false");
             this.enabled = false;
          }
      },
      error => {
          console.log(error);
          this.enabled = false;
      }
    );

    // if (this.enabled == true)
    //   return true;
    // else 
    //   return false;
    // return true;

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
        // this.notifService.show("Error fetching comments!", {type: 'error', position:'bottom'});

          console.log(error);
      }
    );
    
    this.enableToComment();
  }

}
