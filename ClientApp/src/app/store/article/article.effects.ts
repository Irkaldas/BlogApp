import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Favorite } from 'src/app/model/favorite.model';
import { ArticlesService } from 'src/app/services/articles.service';
import { loadCommentsFailure } from '../comment/comment.actions';
import { addArticleToFavorites, AddArticleToFavoritesFailure, AddArticleToFavoritesSuccess, loadArticles, loadArticlesSuccess } from './article.actions';



@Injectable()
export class ArticleEffects {
  constructor(private actions$: Actions,
    private articlesService: ArticlesService,
    private activatedRoute: ActivatedRoute) { }

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
          )
      )
    )
  });

  addArticleToFavorites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addArticleToFavorites),
      switchMap((actionParameter) =>
        this.articlesService.AddArticleToFavorites(actionParameter.favorite)
          .pipe(
            map((favorite) => {
              return AddArticleToFavoritesSuccess({ favorite: favorite as Favorite });
            }),
            catchError((error) => of(AddArticleToFavoritesFailure({ error: error })))
          ))
    )
  })
}
