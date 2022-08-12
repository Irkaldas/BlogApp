import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { FavoritesService } from 'src/app/services/favorites.service';
import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';
import {
  addArticleToFavorites, addArticleToFavoritesFailure, addArticleToFavoritesSuccess,
  loadFavorites, loadFavoritesFailure, loadFavoritesSuccess, removeArticleFromFavorites, removeArticleFromFavoritesFailure, removeArticleFromFavoritesSuccess
} from './favorite.actions';

@Injectable()
export class FavoriteEffects {

  constructor(private actions$: Actions,
    private favoritesService: FavoritesService,
    private snackBar: MatSnackBar) { }

  loadFavoritesArticles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadFavorites),
      switchMap(() =>
        this.favoritesService.GetFavorites()
          .pipe(
            map((favorites) => {
              console.log(favorites);
              return loadFavoritesSuccess({ favorites: favorites });
            }
            ),
            catchError((error) => of(loadFavoritesFailure({ error: error })))
          )
      ),
    )
  });

  addArticleToFavorites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addArticleToFavorites),
      switchMap((actionParameter) => {
        console.log("addArticleToFavorites$");
        console.log(actionParameter.favorite);
        return this.favoritesService.AddArticleToFavorites(actionParameter.favorite)
          .pipe(
            map((favorite) => {
              this.openCommentSnackBar("Item added succefully!", false);
              return addArticleToFavoritesSuccess({ favorite: favorite });
            }),
            catchError((error) => {
              this.openCommentSnackBar("Coulnd't add item.", true);
              return of(addArticleToFavoritesFailure({ error: error }));
            })
          )
      }
      )
    );
  });

  removeArticleFromFavorites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(removeArticleFromFavorites),
      switchMap((actionParameter) =>
        this.favoritesService.RemoveArticleFromFavorites(actionParameter.id)
          .pipe(
            map(() => {
              this.openCommentSnackBar("Item removed succefully!", false);
              return removeArticleFromFavoritesSuccess({ id: actionParameter.id });
            }),
            catchError((error) => {
              this.openCommentSnackBar("Coulnd't remove item.", true);
              return of(removeArticleFromFavoritesFailure({ error: error }));
            })
          ))
    )
  })

  private openCommentSnackBar(message: string, err: boolean): void {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 5 * 1000,
      data: { message, err }
    });
  }
}

