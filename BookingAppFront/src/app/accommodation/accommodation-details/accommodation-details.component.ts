import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Accommodation } from '../accommodation';
import { HttpService } from '../../service/http-service';
import { AuthService } from "app/service/auth-service";
import { Room } from "app/room/room";
import { ManagerService } from "app/service/manager-service";
import { CommentComponent } from "app/comment/comment.component";


@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']
})
export class AccommodationDetailsComponent implements OnInit {

  id: number;
  accommodation: Accommodation;
  room: Room;

  constructor( private router: Router, private activatedRoute: ActivatedRoute,
                private httpService: HttpService, private authService: AuthService, private managerService: ManagerService ) {
      activatedRoute.params.subscribe(params => {this.id = params['id'];
      this.accommodation = new Accommodation(); //0,"", "", "", null,null,null,"", true, 0,0,0 
      this.accommodation.AccommodationTypeId = -1;
      this.accommodation.AccomTypeName = "";
      this.accommodation.Address = "";
      this.accommodation.Approved = true;
      this.accommodation.AppUserId = -1;
      this.accommodation.AverageGrade = 0;
      this.accommodation.Description = "";
      this.accommodation.Id = -1;
      this.accommodation.ImageURL = "";
      this.accommodation.Latitude = 0;
      this.accommodation.Longitude = 0;
      this.accommodation.Name = "";
      this.accommodation.PlaceName = "";
    
    });
  }

  isLoggedIn(): boolean {
      return this.authService.isLoggedIn();
  }

  roomWasSelected(room: Room){
      this.room = room;
      console.log('Selected room***');
      console.log(this.room);
  }

  checkForComment(){
      let comment: CommentComponent = new CommentComponent(this.httpService, this.authService);
      comment.enableToComment();
      console.log("Click check for comment");
  }

  // sa servera treba da dobavi podatke o smestaju sa id koji je prosledjen propertijem this.id
  ngOnInit() {
    console.log("Accommodation Details: " + this.id);
    // console.log("LogIn " + localStorage.getItem('currentUser'));
    this.managerService.getAccommodationDetails(this.id).subscribe(
      (res: Accommodation) => {
            console.log(res);
            this.accommodation = res;
      },
      error => {
            console.log(error);
      }

    );
  }



}
