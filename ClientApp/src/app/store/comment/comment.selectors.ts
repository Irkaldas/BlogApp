import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import * as fromComments from './comment.reducer';

export const selectCommentsState = createFeatureSelector<fromComments.CommentsState>('comments');

export const selectAllComments = createSelector(
    selectCommentsState,
    fromComments.selectAll
)
