import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ArticlesState } from './article.reducer';

export const selectArticlesState = (state: AppState) => state.articles;
export const selectArticles = createSelector(
    selectArticlesState,
    (state: ArticlesState) => state.articles
)