import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Article } from 'src/app/model/article.model';
import { Pagination, SortTypes } from 'src/app/model/pagination.model';
import { selectAllArticles, selectArticlesWithIds } from '../article/article.selectors';
import * as fromPagination from './pagination.reducer';

export const selectPaginationsState = createFeatureSelector<fromPagination.PaginationState>('paginations');

export const selectAllPages = createSelector(
    selectPaginationsState,
    fromPagination.selectAll
)

export const selectPage = (page: number, sortType: SortTypes, search: String) => createSelector(
    selectAllPages,
    (paginations: Pagination[]) =>
        paginations.find(pagination =>
            pagination.page == page &&
            pagination.sort == sortType &&
            pagination.search == search)
)

export const selectTotalPages = (page: number, sortType: SortTypes, search: String) => createSelector(
    selectPage(page, sortType, search),
    (page: Pagination) => page.totalPages
)

export const selectPageArticles = (page: number, sortType: SortTypes, search: String) => createSelector(
    selectAllArticles,
    selectPage(page, sortType, search),
    (articles, page) => page != undefined ? articles.filter(article => page?.ids?.includes(article?.id as number)) : []
)
