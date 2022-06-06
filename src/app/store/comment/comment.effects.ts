import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, from, of, scheduled } from 'rxjs';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import { CommentSnackBarComponent } from 'src/app/comment/comment-snack-bar.component';
import { CommentsService } from 'src/app/services/comments.service';
import { AppState } from '../app.state';
import {
  addComment, addCommentFailure, addCommentSuccess,
  loadComments, loadCommentsFailure, loadCommentsSuccess
} from './comment.actions';

@Injectable()
export class CommentEffects {

  constructor(
    private actions$: Actions,
    private commentsService: CommentsService,
    private snackBar: MatSnackBar
  ) { }

  loadComments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadComments),
      switchMap((actionParameter) =>
        this.commentsService.GetComments(actionParameter.articleId)
          .pipe(
            map((comments) =>
              loadCommentsSuccess({ comments: comments })
            ),
            catchError((error) => of(loadCommentsFailure({ error: error })))
          ))
    )
  })

  addComment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addComment),
      switchMap((actionParameter) =>
        this.commentsService.AddComment(actionParameter.comment)
          .pipe(
            map((comment) => {
              this.openCommentSnackBar("Your comment was successfully posted! :)", false);
              return addCommentSuccess({ comment: comment })
            }),
            catchError((error) => {
              this.openCommentSnackBar("Error occured. Couldn\'t add your comment. Try again later.", true)
              return of(addCommentFailure({ error: error }))
            })
          ))
    )
  })

  private openCommentSnackBar(message: string, err: boolean): void {
    this.snackBar.openFromComponent(CommentSnackBarComponent, {
      duration: 5 * 1000,
      data: { message, err }
    })
  }
}
