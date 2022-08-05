import { createSelector } from '@ngrx/store';
import { create } from 'domain';
import { AppState } from '../app.state';
import { ArticlesState } from './article.reducer';

export const selectArticlesState = (state: AppState) => state.articles;
export const selectArticles = createSelector(
    selectArticlesState,
    (state: ArticlesState) => state.articles
)



