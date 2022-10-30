import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Favorite } from '../model/favorite.model';
import { takeUntil, filter, take } from 'rxjs/operators';
import { SnackBarComponent } from '../shared/snack-bar/snack-bar.component';
import { AppState } from '../store/app.state';
import { selectArticleWithId } from '../store/article/article.selectors';
import { favoritesActions } from '../store/favorite/favorite.actions';
import { selectFavoriteId, selectIsFavorite } from '../store/favorite/favorite.selectors';
import { selectIsUserLoggedIn, selectUserId } from '../store/user/user.selectors';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleDetailsComponent implements OnDestroy {

  constructor(
    private activeRoute: ActivatedRoute,
    private store: Store<AppState>,
    private snackBar: MatSnackBar
  ) { }

  public article$ = this.store.select(selectArticleWithId(this.activeRoute.snapshot.params["id"]));
  public isFavorite$ = this.store.select(selectIsFavorite(this.activeRoute.snapshot.params["id"]));
  public isLoggedIn$ = this.store.select(selectIsUserLoggedIn);

  private favoriteId$ = this.store.select(selectFavoriteId(this.activeRoute.snapshot.params["id"]));
  private userId$ = this.store.select(selectUserId);
  private readonly destroy$ = new Subject();

  addArticleToFavorites(): void {

    let newFavorite: Favorite = {};

    this.userId$.pipe(takeUntil(this.destroy$)).subscribe((userId) => {
      newFavorite.userId = userId
    });
    this.article$.pipe(takeUntil(this.destroy$)).subscribe((article) =>
      newFavorite.articleId = article?.id);
    if (newFavorite.articleId != null && newFavorite.userId != null) {
      this.store.dispatch(favoritesActions.add({ favorite: newFavorite }));
    } else {
      this.snackBar.openFromComponent(SnackBarComponent, {
        duration: 5 * 1000,
        data: { message: "Couldn't add item to favorite list.", err: true }
      });
    }
  }

  removeArticleFromFavorites(): void {
    this.favoriteId$.pipe(
      takeUntil(this.destroy$),
      take(1))
      .subscribe((favoriteId) =>
        this.store.dispatch(favoritesActions.remove({ favoriteId: favoriteId as number }))
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
