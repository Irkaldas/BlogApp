import { Action, createReducer, on } from '@ngrx/store';
import { Article } from 'src/app/model/article.model';
import { loadArticles, loadArticlesFailure, loadArticlesSuccess } from './article.actions';


export const articleFeatureKey = 'articles';

export interface ArticlesState {
  articles: Article[],
  error: string,
  status: 'pending' | 'loading' | 'error' | 'success' | 'adding' | 'removing'
}

export const initialState: ArticlesState = {
  articles: [],
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
  on(loadArticlesFailure, (status, { error }) => ({
    ...status,
    error: error,
    status: 'error'
  }))
);
