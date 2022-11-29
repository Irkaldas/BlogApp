import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Pagination } from '../../model/pagination.model';
import { paginationActions } from './pagination.actions';

export const paginationsFeatureKey = 'paginations';

export interface PaginationState extends EntityState<Pagination> {
  // additional entities state properties
}

export const paginationAdapter: EntityAdapter<Pagination> = createEntityAdapter<Pagination>();

export const initialState: PaginationState = paginationAdapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(paginationActions.loadPageSuccess, (state, { page, sortType, search, articlesIds }) => paginationAdapter.addOne({
    page: page,
    sort: sortType,
    search: search as string,
    ids: articlesIds,
  }, { ...state })
  )
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = paginationAdapter.getSelectors();
