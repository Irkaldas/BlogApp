import { createReducer, on } from '@ngrx/store';
import { Comment } from 'src/app/model/comment.model';
import {
  addComment, addCommentFailure, addCommentSuccess,
  loadComments, loadCommentsFailure, loadCommentsSuccess
} from './comment.actions';


export const commentFeatureKey = 'comments';

export interface CommentsState {
  comments: Comment[],
  error: string,
  status: 'pending' | 'loading' | 'error' | 'success' | 'adding' | 'removing'
}

export const initialState: CommentsState = {
  comments: [],
  error: '',
  status: 'pending'
};

export const commentReducer = createReducer(
  initialState,
  on(addComment, (state) => ({
    ...state, status: 'adding'
  })),
  on(addCommentSuccess, (state, { comment }) => ({
    ...state,
    comments: [...state.comments, comment]
  })),
  on(addCommentFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),
  on(loadComments, (state) => ({
    ...state, status: 'loading'
  })),
  on(loadCommentsSuccess, (state, { comments }) => ({
    ...state,
    comments: comments,
    status: 'success'
  })),
  on(loadCommentsFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  }))
)
