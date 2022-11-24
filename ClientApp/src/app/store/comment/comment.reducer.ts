import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Comment } from 'src/app/model/comment.model';
import { commentsActions } from './comment.actions';


export const commentFeatureKey = 'comments';

export interface CommentsState extends EntityState<Comment> {
}

export const commentsAdapter: EntityAdapter<Comment> = createEntityAdapter<Comment>();

export const initialCommentsState: CommentsState = commentsAdapter.getInitialState({

});

export const commentReducer = createReducer(
  initialCommentsState,
  on(commentsActions.loadSuccess, (state, { comments }) =>
    commentsAdapter.setAll(comments, state)
  ),
  on(commentsActions.addSuccess, (state, { comment }) =>
    commentsAdapter.addOne(comment, state)
  ),
)
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = commentsAdapter.getSelectors();