import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Article } from 'src/app/model/article.model';
import * as fromArticles from './article.reducer';

export const selectArticlesState = createFeatureSelector<fromArticles.ArticlesState>('articles');

const {
    selectAll
} = fromArticles.articlesAdapter.getSelectors();

export const selectAllArticles = createSelector(
    selectArticlesState,
    selectAll
)

export const selectArticlesWithIds = (articleIds: number[]) => createSelector(
    selectAllArticles,
    (articles: Article[]) => articles.find(article => !articleIds.includes(article.id as number))
)

// export const selectHasLoaded = createSelector(
//     selectArticlesState,
//     (articleState: fromArticles.ArticlesState) => articleState.hasLoaded
// )