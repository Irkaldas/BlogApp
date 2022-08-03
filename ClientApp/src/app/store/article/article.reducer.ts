import { Action, createReducer, on } from '@ngrx/store';
import { Article } from 'src/app/model/article.model';
import { Favorite } from 'src/app/model/favorite.model'
import { AddArticleToFavoritesFailure, AddArticleToFavoritesSuccess, loadArticles, loadArticlesFailure, loadArticlesSuccess, loadFavoriteArticles, loadFavoriteArticlesSuccess } from './article.actions';


export const articleFeatureKey = 'articles';

export interface ArticlesState {
  articles: Article[],
  favorites: Favorite[],
  error: string,
  status: 'pending' | 'loading' | 'error' | 'success' | 'adding' | 'removing'
}

export const initialState: ArticlesState = {
  articles: [],
  favorites: [],
  error: '',
  status: 'pending'
};

export const articleReducer = createReducer(
  initialState,
  on(loadArticles, (state) => ({
    ...state,
    status: 'loading'
  })),
  on(loadArticlesSuccess, (state, { articles }) => ({
    ...state,
    articles: [...articles],
    status: 'success'
  })),
  on(loadArticlesFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error'
  })),
  on(loadFavoriteArticles, (state) => ({
    ...state,
  })),
  on(loadFavoriteArticlesSuccess, (state, { favorites }) => ({
    ...state,
    favorites: [...favorites]
  })),
  on(AddArticleToFavoritesSuccess, (state, { favorite }) => ({
    ...state,
    favorites: [...state.favorites, favorite],
    status: 'success'
  })),
  on(AddArticleToFavoritesFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error'
  }))
);
