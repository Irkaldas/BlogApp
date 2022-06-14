import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/model/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {

  constructor() { }

  @Input()
  public comment: Comment = new Comment();

}
