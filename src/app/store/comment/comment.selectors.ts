import { createSelector } from '@ngrx/store';
import { CommentsState } from './comment.reducer';

export interface AppState {
    comments: CommentsState,
}

export const selectComments = (state: AppState) => state.comments;
export const selectAllComments = createSelector(
    selectComments,
    (state: CommentsState) => {
        return state.comments;
    }
)