import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Article } from 'src/app/model/article.model';
import { Favorite } from '../model/favorite.model';
import { AppState } from '../store/app.state';
import { selectFavoriteId, selectIsFavorite } from '../store/favorite/favorite.selectors';
import { selectIsUserLoggedIn, selectUserId } from '../store/user/user.selectors';
import { takeUntil, take } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { favoritesActions } from '../store/favorite/favorite.actions';
import { SnackBarComponent } from '../shared/snack-bar/snack-bar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent implements OnChanges, OnDestroy {

  constructor(
    private store: Store<AppState>,
  ) { }

  @Input() article: Article = {};
  @Input() index: number = 0;

  public article$ = new BehaviorSubject<Article>({});
  public isLoggedIn$ = this.store.select(selectIsUserLoggedIn);
  public isFavorite$ = new Observable<boolean>();

  private favoriteId$ = new Observable<number>();
  private userId$ = this.store.select(selectUserId);
  private readonly destroy$ = new Subject();

  ngOnChanges(changes: SimpleChanges): void {
    this.isFavorite$ = this.store.select(selectIsFavorite(this.article.id as number));
    this.favoriteId$ = this.store.select(selectFavoriteId(this.article.id as number));
  }

  addArticleToFavorites(): void {

    let newFavorite: Favorite = {
      articleId: this.article.id
    };

    this.userId$.pipe(takeUntil(this.destroy$)).subscribe(
      (userId) => newFavorite.userId = userId);

    if (newFavorite.articleId != null && newFavorite.userId != null) {
      this.store.dispatch(favoritesActions.add({ favorite: newFavorite }));
    } else {
      // this.snackBar.openFromComponent(SnackBarComponent, {
      //   duration: 5 * 1000,
      //   data: { message: "Couldn't add item to favorite list.", err: true }
      // });
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
