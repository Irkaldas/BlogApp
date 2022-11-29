import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { paginationActions } from './pagination.actions';

import { catchError, map, switchMap, filter, tap } from 'rxjs/operators';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { ArticlesService } from 'src/app/services/articles.service';
import { defer } from 'rxjs';
import { articlesActions } from '../article/article.actions';

@Injectable()
export class PaginationEffects {

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private articlesService: ArticlesService
  ) { }


  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      //concatLatestFrom(() => this.store.select(selectHasLoaded)),
      //filter(([action, hasLoaded]) => !hasLoaded),
      switchMap(() =>
        this.articlesService.GetArticles()
          .pipe(
            map((articles) => {
              console.log(articles);
              return articlesActions.loadSuccess({ articles: articles })
            }
            ),
          )
      ),
    )
  );

  // loadPage$ = createEffect(() => 
  //   ofType(paginationActions.loadPage),
  //   switchMap((payload) => {

  //   } 
  //   )
  // )

}
