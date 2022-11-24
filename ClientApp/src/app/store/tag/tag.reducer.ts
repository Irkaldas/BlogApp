import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Tag } from 'src/app/model/tag.model';
import { tagsActions } from './tag.actions';


export const tagFeatureKey = 'tags';

export interface TagsState extends EntityState<Tag> {

}

export const tagsAdapter: EntityAdapter<Tag> = createEntityAdapter<Tag>();

export const initialState = tagsAdapter.getInitialState({});

export const tagReducer = createReducer(
  initialState,
  on(tagsActions.loadSuccess, (state, { tags }) =>
    tagsAdapter.setAll(tags, state)
  )
);
