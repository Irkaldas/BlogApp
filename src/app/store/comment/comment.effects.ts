import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, from, of, scheduled } from 'rxjs';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';
import { CommentsService } from 'src/app/services/comments.service';
import { AppState } from '../app.state';
import { commentsActions } from './comment.actions';

@Injectable()
export class CommentEffects {

  constructor(
    private actions$: Actions,
    private commentsService: CommentsService,
  ) { }

  loadComments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(commentsActions.load),
      switchMap((actionParameter) =>
        this.commentsService.GetComments(actionParameter.articleId)
          .pipe(
            map((comments) =>
              commentsActions.loadSuccess({ comments: comments })
            )
          ))
    )
  })

  addComment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(commentsActions.add),
      switchMap((actionParameter) =>
        this.commentsService.AddComment(actionParameter.comment)
          .pipe(
            map((comment) => {
              this.openCommentSnackBar("Your comment was successfully posted! :)", false);
              return commentsActions.addSuccess({ comment: comment })
            }),
            catchError((error) => {
              this.openCommentSnackBar("Error occured. Couldn\'t add your comment. Try again later.", true)
              return of(error);
            })
          ))
    )
  })

  private openCommentSnackBar(message: string, err: boolean): void {
    // this.snackBar.openFromComponent(SnackBarComponent, {
    //   duration: 5 * 1000,
    //   data: { message, err }
    // })
  }
}
