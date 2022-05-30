import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CommentsRepository } from 'src/app/model/comments.repository.model';
import { Comment } from 'src/app/model/comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnDestroy {

  public comments$: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>([]);
  public commentSubsryption: Subscription = new Subscription();
  public showComments: boolean = false;

  constructor(private commentsRepository: CommentsRepository,
    private activatedRoute: ActivatedRoute) {
  }

  loadComments(): void {
    let id = this.activatedRoute.snapshot.params["id"];
    this.commentSubsryption.add(this.commentsRepository.GetComments(id)
      .subscribe(comments => this.comments$.next(comments)));
    this.showComments = true;
  }

  refreshComments(comment: Comment): void {
    this.comments$.next([...this.comments$.value, comment]);
  }

  getCommentKey(index: number, comment: Comment) {
    return comment.id;
  }

  ngOnDestroy(): void {
    this.commentSubsryption.unsubscribe();
  }
}
