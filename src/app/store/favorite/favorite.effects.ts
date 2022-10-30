import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Favorite } from 'src/app/model/favorite.model';
import { FavoritesService } from 'src/app/services/favorites.service';
import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';
import { AppState } from '../app.state';
import { userActions } from '../user/user.actions';
import { selectUserId } from '../user/user.selectors';
import { favoritesActions } from './favorite.actions';
import { selectFavoriteId } from './favorite.selectors';

@Injectable()
export class FavoriteEffects {

  constructor(
    private actions$: Actions,
    private favoritesService: FavoritesService,
    private snackBar: MatSnackBar,
    private store: Store<AppState>
  ) { }

  loadFavoritesArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loginSuccess),
      switchMap((actionParameter) =>
        this.favoritesService.GetFavorites(actionParameter.user.id as string)
          .pipe(
            map((favorites) =>
              favoritesActions.loadSuccess({ favorites: favorites })
            )
          )
      )
    ),
  );

  addArticleToFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(favoritesActions.add),
      switchMap((actionParameter) =>
        this.favoritesService.AddArticleToFavorites(actionParameter.favorite)
          .pipe(
            map((favorite) => {
              this.openCommentSnackBar("Item added succefully!", false);
              return favoritesActions.addSuccess({ favorite: favorite });
            }),
          )
      )
    )
  );

  removeArticleFromFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(favoritesActions.remove),
      switchMap((actionParameter) =>
        this.favoritesService.RemoveArticleFromFavorites(actionParameter.favoriteId)
          .pipe(
            map(() => {
              this.openCommentSnackBar("Item removed succefully!", false);
              return favoritesActions.removeSuccess({ favoriteId: actionParameter.favoriteId });
            }),
          ))
    )
  )

  private openCommentSnackBar(message: string, err: boolean): void {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 5 * 1000,
      data: { message, err }
    });
  }
}

