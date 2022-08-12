import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { FavoritesState } from './favorite.reducer';

export const selectAllFavorites = (state: AppState) => state.favorites;
export const selectFavorites = createSelector(
    selectAllFavorites,
    (state: FavoritesState) => state.favorites
);

export const selectIsFavorite = (articleId: number) => createSelector(
    selectAllFavorites,
    (state: FavoritesState) => state.favorites.find(f => f.articleId == articleId) ? true : false
);