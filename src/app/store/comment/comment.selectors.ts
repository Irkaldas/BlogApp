import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import * as fromComments from './comment.reducer';

export const selectCommentsState = createFeatureSelector<fromComments.CommentsState>('comments');

const {
    selectAll
} = fromComments.commentsAdapter.getSelectors();

export const selectAllComments = createSelector(
    selectCommentsState,
    selectAll
)
