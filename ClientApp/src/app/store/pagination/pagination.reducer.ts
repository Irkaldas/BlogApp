import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Pagination } from '../../model/pagination.model';
import * as PaginationActions from './pagination.actions';

export const paginationsFeatureKey = 'paginations';

export interface paginationState extends EntityState<Pagination> {
  // additional entities state properties
}

export const paginationAdapter: EntityAdapter<Pagination> = createEntityAdapter<Pagination>();

export const initialState: paginationState = paginationAdapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = paginationAdapter.getSelectors();
