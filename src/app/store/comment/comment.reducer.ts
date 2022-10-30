import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Comment } from 'src/app/model/comment.model';
import { commentsActions } from './comment.actions';


export const commentFeatureKey = 'comments';

export interface CommentsState extends EntityState<Comment> {
}

export const commentsAdapter: EntityAdapter<Comment> = createEntityAdapter<Comment>();

export const initialCommentsState: CommentsState = commentsAdapter.getInitialState();

export const commentReducer = createReducer(
  initialCommentsState,
  on(commentsActions.loadSuccess, (state, { comments }) =>
    commentsAdapter.setAll(comments, state)
  ),
  on(commentsActions.addSuccess, (state, { comment }) =>
    commentsAdapter.addOne(comment, state)
  ),
)


// export const commentReducer = createReducer(
//   initialCommentsState,
//   on(addComment, (state) => ({
//     ...state, status: 'loading'
//   })),
//   on(addCommentSuccess, (state, { comment }) => ({
//     ...state,
//     comments: [...state.comments, comment],
//     status: 'success',
//     isLoaded: true
//   })),
//   on(addCommentFailure, (state, { error }) => ({
//     ...state,
//     error: error,
//     status: 'error',
//   })),
//   on(loadComments, (state) => ({
//     ...state, status: 'loading'
//   })),
//   on(loadCommentsSuccess, (state, { comments }) => ({
//     ...state,
//     comments: comments,
//     status: 'success'
//   })),
//   on(loadCommentsFailure, (state, { error }) => ({
//     ...state,
//     error: error,
//     status: 'error',
//   }))
// )
