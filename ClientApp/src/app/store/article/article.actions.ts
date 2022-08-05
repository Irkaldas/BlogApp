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