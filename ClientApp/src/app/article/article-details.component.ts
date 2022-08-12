import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Article } from 'src/app/model/article.model';
import { Favorite } from '../model/favorite.model';
import { ArticlesService } from '../services/articles.service';
import { SnackBarComponent } from '../shared/snack-bar/snack-bar.component';
import { AppState } from '../store/app.state';
import { addArticleToFavorites, removeArticleFromFavorites } from '../store/favorite/favorite.actions';
import { selectIsFavorite } from '../store/favorite/favorite.selectors';
import { selectUserData, selectUserStatus } from '../store/user/user.selectors';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {

  constructor(private activeRoute: ActivatedRoute,
    private store: Store<AppState>,
    private snackBar: MatSnackBar) { }

  public article$: BehaviorSubject<Article> = new BehaviorSubject<Article>(new Article());
  public isFavorite$ = this.store.select(selectIsFavorite(this.activeRoute.snapshot.params["id"]));
  public isLoggedIn$ = this.store.select(selectUserStatus);

  private articleSubscribtion: Subscription = new Subscription();


  ngOnInit(): void {
    this.articleSubscribtion.add(this.activeRoute.data.subscribe((data: any) => {
      this.article$.next(data['model']);
    }));

  }

  addArticleToFavorites(id: number | undefined): void {
    let newFavorite: Favorite = new Favorite();
    newFavorite.articleId = id;
    this.articleSubscribtion.add(this.store.select(selectUserData).subscribe((user) =>
      newFavorite.userId = user?.id
    ));
    console.log(newFavorite);
    if (newFavorite.articleId != null && newFavorite.userId != null) {
      this.store.dispatch(addArticleToFavorites({ favorite: newFavorite }));
    }
    else {
      this.snackBar.openFromComponent(SnackBarComponent, {
        duration: 5 * 1000,
        data: { message: "Couldn't add item to favorite list.", err: true }
      });
    }
  }

  removeArticleFromFavorites(id: number | undefined): void {
    if (id != null) {
      this.store.dispatch(removeArticleFromFavorites({ id: id }));
    }
    else {
      this.snackBar.openFromComponent(SnackBarComponent, {
        duration: 5 * 1000,
        data: { message: "Couldn't remove item from favorite list.", err: true }
      });
    }
  }

  ngOnDestroy(): void {
    this.articleSubscribtion.unsubscribe();
  }
}
