import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Favorite } from 'src/app/model/favorite.model';
import { ArticlesService } from 'src/app/services/articles.service';
import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';
import { loadCommentsFailure } from '../comment/comment.actions';
import { loadArticles, loadArticlesSuccess } from './article.actions';



@Injectable()
export class ArticleEffects {
  constructor(private actions$: Actions,
    private articlesService: ArticlesService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  loadArticles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadArticles),
      switchMap(() =>
        this.articlesService.GetArticles()
          .pipe(
            map((articles) => {
              console.log(articles);
              return loadArticlesSuccess({ articles: articles });
            }
            ),
            catchError((error) => of(loadCommentsFailure({ error: error })))
          )),
    )
  });
}
