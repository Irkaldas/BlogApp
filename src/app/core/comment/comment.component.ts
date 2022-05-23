import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/model/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  constructor() { }

  @Input()
  public comment: Comment = new Comment();

  ngOnInit(): void {
  }
}
