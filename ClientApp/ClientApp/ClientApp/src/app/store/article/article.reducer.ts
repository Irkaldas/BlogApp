import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Article } from 'src/app/model/article.model';
import { articlesActions } from './article.actions';

export const articleFeatureKey = 'articles';

export interface ArticlesState extends EntityState<Article> {
  hasLoaded: boolean;
}

export const articlesAdapter: EntityAdapter<Article> = createEntityAdapter<Article>();

export const initialArticleState: ArticlesState = articlesAdapter.getInitialState({
  hasLoaded: false
});

export const articleReducer = createReducer(
  initialArticleState,
  on(articlesActions.loadSuccess, (state, { articles }) =>
    articlesAdapter.setAll(articles, { ...state, hasLoaded: true })
  ),
)
