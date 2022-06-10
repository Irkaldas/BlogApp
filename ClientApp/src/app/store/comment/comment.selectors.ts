import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { CommentsState } from './comment.reducer';

export const selectComments = (state: AppState) => state.comments;
export const selectAllComments = createSelector(
    selectComments,
    (state: CommentsState) => state.comments

)