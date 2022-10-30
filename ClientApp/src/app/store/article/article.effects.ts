import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { combineLatest, EMPTY, of } from 'rxjs';
import { catchError, map, switchMap, filter } from 'rxjs/operators';
import { ArticlesService } from 'src/app/services/articles.service';
import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';
import { AppState } from '../app.state';
import { articlesActions } from './article.actions';
import { selectHasLoaded } from './article.selectors';



@Injectable()
export class ArticleEffects {
  constructor(
    private actions$: Actions,
    private articlesService: ArticlesService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private store: Store<AppState>
  ) { }

  loadArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articlesActions.load),
      concatLatestFrom(() => this.store.select(selectHasLoaded)),
      filter(([action, hasLoaded]) => !hasLoaded),
      switchMap(() =>
        this.articlesService.GetArticles()
          .pipe(
            map((articles) =>
              articlesActions.loadSuccess({ articles: articles })
            ),
          )
      ),
    )
  );
}
