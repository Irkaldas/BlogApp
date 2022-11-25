import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Article } from 'src/app/model/article.model';
import { articlesActions } from './article.actions';

export const articleFeatureKey = 'articles';

export interface ArticlesState extends EntityState<Article> {
  page: number,
  articlesPerPage: number,
  totalArticles: number,
  get totalPages(): number
}

export const articlesAdapter: EntityAdapter<Article> = createEntityAdapter<Article>();

export const initialArticleState: ArticlesState = articlesAdapter.getInitialState({
  page: 1,
  articlesPerPage: 9,
  totalArticles: 0,
  get totalPages() {
    return Math.ceil(this.totalArticles / this.articlesPerPage);
  }
});

export const articleReducer = createReducer(
  initialArticleState,
  on(articlesActions.loadSuccess, (state, { articles }) =>
    articlesAdapter.setAll(articles, { ...state, hasLoaded: true })
  ),
  on(articlesActions.postArticleSuccess, (state, { article }) =>
    articlesAdapter.addOne(article, state)
  )
)
