import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ArticlesState } from './article.reducer';

export const selectArticles = (state: AppState) => state.articles;
export const selectAllArticles = createSelector(
    selectArticles,
    (state: ArticlesState) => state.articles
)