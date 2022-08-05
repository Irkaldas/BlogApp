import { Action, createReducer, on } from '@ngrx/store';
import { Favorite } from 'src/app/model/favorite.model';
import { addArticleToFavoritesFailure, addArticleToFavoritesSuccess, loadFavorites, loadFavoritesSuccess } from './favorite.actions';


export const favoriteFeatureKey = 'favorite';

export interface FavoritesState {
  favorites: Favorite[]
}

export const initialState: FavoritesState = {
  favorites: []
};

export const reducer = createReducer(
  initialState,
  on(loadFavorites, (state) => ({
    ...state,
  })),
  on(loadFavoritesSuccess, (state, { favorites }) => ({
    ...state,
    favorites: [...favorites]
  })),
  on(addArticleToFavoritesSuccess, (state, { favorite }) => ({
    ...state,
    favorites: [...state.favorites, favorite],
    status: 'success'
  })),
  on(addArticleToFavoritesFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error'
  }))
);
