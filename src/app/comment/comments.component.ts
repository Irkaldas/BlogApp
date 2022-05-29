import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommentsRepository } from 'src/app/model/comments.repository.model';
import { Comment } from 'src/app/model/comment.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent {
  private readonly refreshComments$ = new BehaviorSubject<Comment>(new Comment());
  public readonly comments$: Observable<Comment[]>;
  public showComments: boolean = false;

  constructor(private commentsRepository: CommentsRepository, private activatedRoute: ActivatedRoute) {
    let id = this.activatedRoute.snapshot.params["id"];
    this.comments$ = this.refreshComments$.pipe(
      switchMap(() => this.commentsRepository.GetComments(id)));
  }

  refreshComments(comment: Comment): void {
    this.refreshComments$.next(comment);
  }

  getCommentKey(index: number, comment: Comment) {
    return comment.id;
  }
}
