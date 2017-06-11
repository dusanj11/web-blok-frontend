import { Component, OnInit } from '@angular/core';
import { Comment } from './comment';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  comments: Comment[];

  // konstrutkor inicijalizuje listu komentara za odredjeni smestaj
  constructor() { }

  ngOnInit() {
  }

}
