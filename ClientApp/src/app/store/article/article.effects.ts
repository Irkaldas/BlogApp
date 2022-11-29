import { Injectable } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { combineLatest, EMPTY, of } from 'rxjs';
import { catchError, map, switchMap, filter, tap } from 'rxjs/operators';
import { ArticlesService } from 'src/app/services/articles.service';
import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';
import { AppState } from '../app.state';
import { paginationActions } from '../pagination/pagination.actions';
import { selectPage } from '../pagination/pagination.selectors';
import { articlesActions } from './article.actions';
//import { selectHasLoaded } from './article.selectors';



@Injectable()
export class ArticleEffects {
  constructor(
    private actions$: Actions,
    private articlesService: ArticlesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) { }

  loadArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articlesActions.load),
      concatLatestFrom((payload) => this.store.select(selectPage(payload.page, payload.sortType, payload.search))),
      filter(([_, isPageLoaded]) => isPageLoaded != undefined),
      switchMap(([payload]) =>
        this.articlesService.GetArticles(payload.page, payload.sortType, payload.search)
          .pipe(
            map((articles) => {
              paginationActions.loadPageSuccess({ ...payload, articlesIds: articles.map(a => a.id) as number[] });
              return articlesActions.loadSuccess({ articles: articles })
            }
            ),
          )
      ),
    )
  );

  postArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articlesActions.postArticle),
      switchMap((actionParameter) =>
        this.articlesService.PostArticle(actionParameter.article)
          .pipe(
            map(article =>
              articlesActions.postArticleSuccess({ article: article })),
            tap((actionParameter) => this.router.navigate([`/article/${actionParameter.article.id}`]))
          ))
    ))
}
