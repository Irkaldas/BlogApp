import { ChangeDetectionStrategy, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Comment } from 'src/app/model/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent implements DoCheck {

  constructor() { }

  @Input()
  public comment: Comment = {};

  ngDoCheck(): void {
    console.log(`CHECK TRIGGERED FOR COMMENT WITH ID${this.comment.id}`);
  }

}
