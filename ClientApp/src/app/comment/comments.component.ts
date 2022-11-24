import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/model/comment.model';
import { Store } from '@ngrx/store';
import { selectAllComments } from '../store/comment/comment.selectors';
import { AppState } from '../store/app.state';
import { commentsActions } from '../store/comment/comment.actions';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsComponent {

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
  ) { }

  public comments$ = this.store.select(selectAllComments);
  public isLoggedIn$ = true;
  public showComments: boolean = false;

  ngOnInit() {
  }

  public loadComments(): void {
    this.showComments = true;
    let id = this.activatedRoute.snapshot.params["id"];
    this.store.dispatch(commentsActions.load({ articleId: id }));
  }

  public getCommentKey(index: number, comment: Comment) {
    return comment.id;
  }

}
