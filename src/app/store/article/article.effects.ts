import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ArticlesService } from 'src/app/services/articles.service';
import { loadCommentsFailure } from '../comment/comment.actions';
import { loadArticles, loadArticlesSuccess } from './article.actions';



@Injectable()
export class ArticleEffects {
  constructor(private actions$: Actions,
    private articlesService: ArticlesService,
    private activatedRoute: ActivatedRoute) { }

  loadArticles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadArticles),
      switchMap(() => (
        this.activatedRoute.snapshot.data.viewOption == "favorite"
          ? this.articlesService.GetArticles()
          : this.articlesService.GetArticles()
      ).pipe(
        map((articles) =>
          loadArticlesSuccess({ articles: articles })
        ),
        catchError((error) => of(loadCommentsFailure({ error: error })))
      )

      )
    )
  })
}
