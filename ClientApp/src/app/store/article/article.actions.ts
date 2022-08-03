import { createAction, props } from '@ngrx/store';
import { Article } from 'src/app/model/article.model';
import { Favorite } from 'src/app/model/favorite.model';

export const loadArticles = createAction(
  '[Article] Load Articles'
);

export const loadArticlesSuccess = createAction(
  '[Article] Load Articles Success',
  props<{ articles: Article[] }>()
);

export const loadArticlesFailure = createAction(
  '[Article] Load Articles Failure',
  props<{ error: any }>()
);

export const loadFavoriteArticles = createAction(
  '[Article] Load Favorite Articles'
);

export const loadFavoriteArticlesSuccess = createAction(
  '[Article] Load Favorite Articles Success',
  props<{ favorites: Favorite[] }>()
);

export const loadFavoriteArticlesFailure = createAction(
  '[Article] Load Favorite Articles Failure',
  props<{ error: any }>()
);

export const addArticleToFavorites = createAction(
  '[Article] Add Article to Favorites',
  props<{ favorite: Favorite }>()
);

export const AddArticleToFavoritesSuccess = createAction(
  '[Article] Add Article to Favorites Success',
  props<{ favorite: Favorite }>()
);

export const AddArticleToFavoritesFailure = createAction(
  '[Article] Add Article to Favorites Failure',
  props<{ error: any }>()
);