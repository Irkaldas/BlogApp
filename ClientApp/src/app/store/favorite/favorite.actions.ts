import { createAction, props } from '@ngrx/store';
import { Favorite } from 'src/app/model/favorite.model';

export const loadFavorites = createAction(
  '[Article] Load Favorites',
  props<{ userId: string }>()
);

export const loadFavoritesSuccess = createAction(
  '[Article] Load Favorites Success',
  props<{ favorites: Favorite[] }>()
);

export const loadFavoritesFailure = createAction(
  '[Article] Load Favorites Failure',
  props<{ error: any }>()
);

export const addArticleToFavorites = createAction(
  '[Article] Add Article to Favorites',
  props<{ favorite: Favorite }>()
);

export const addArticleToFavoritesSuccess = createAction(
  '[Article] Add Article to Favorites Success',
  props<{ favorite: Favorite }>()
);

export const addArticleToFavoritesFailure = createAction(
  '[Article] Add Article to Favorites Failure',
  props<{ error: any }>()
);

export const removeArticleFromFavorites = createAction(
  '[Article] Remove Article from Favorites',
  props<{ id: number }>()
);

export const removeArticleFromFavoritesSuccess = createAction(
  '[Article] Remove Article from Favorites Success',
  props<{ id: number }>()
);

export const removeArticleFromFavoritesFailure = createAction(
  '[Article] Remove Article from Favorites Failure',
  props<{ error: any }>()
);