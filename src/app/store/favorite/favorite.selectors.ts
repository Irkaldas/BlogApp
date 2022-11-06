import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Article } from 'src/app/model/article.model';
import { Favorite } from 'src/app/model/favorite.model';
import { AppState } from '../app.state';
import { ArticlesState } from '../article/article.reducer';
import { selectAllArticles, selectArticlesState } from '../article/article.selectors';
import { favoritesAdapter, FavoritesState } from './favorite.reducer';

export const selectFavoritesState = createFeatureSelector<FavoritesState>('favorites');

const {
    selectAll,
    selectEntities
} = favoritesAdapter.getSelectors();

export const selectAllFavorites = createSelector(
    selectFavoritesState,
    selectAll
);

export const selectFavoriteArticles = createSelector(
    selectAllFavorites,
    selectAllArticles,
    (favorites, articles) => {
        if (favorites && articles) {
            return articles.filter(article => favorites.find(favorite => favorite.articleId == article.id));
        } else {
            return new Array<Article>();
        }
    }
);

export const selectIsFavorite = (articleId: number) => createSelector(
    selectAllFavorites,
    favorites => favorites.some(f => f.articleId == articleId)
);

export const selectFavoriteId = (articleId: number) => createSelector(
    selectAllFavorites,
    favorites => favorites.find(f => f.articleId == articleId)?.id as number
)