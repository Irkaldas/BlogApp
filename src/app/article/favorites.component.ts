import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Article } from '../model/article.model';
import { AppState } from '../store/app.state';
import { selectFavoriteArticles } from '../store/favorite/favorite.selectors';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {

  constructor(
    private store: Store<AppState>
  ) { }

  public favoriteArticles$ = this.store.select(selectFavoriteArticles);

  getArticleKey(index: number, article: Article) {
    return article.id;
  }
}
