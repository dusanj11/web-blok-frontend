import { Component, OnInit, Input } from '@angular/core';
import { Comment } from './comment';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  comments: Comment[];

  @Input() id: number;

  // konstrutkor inicijalizuje listu komentara za odredjeni smestaj
  constructor() {
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

  ngOnInit() {
    console.log("Id smestaja za komentar: " + this.id);
  }

}
