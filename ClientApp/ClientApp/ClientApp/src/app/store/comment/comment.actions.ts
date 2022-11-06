import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Comment } from 'src/app/model/comment.model';

export const commentsActions = createActionGroup({
  source: 'Comments API',
  events: {
    'Load': props<{ articleId: number }>(),
    'Load Success': props<{ comments: Comment[] }>(),
    'Add': props<{ comment: Comment }>(),
    'Add Success': props<{ comment: Comment }>(),
  }
})


// export const addComment = createAction(
//   '[Comment] Add Comment',
//   props<{ comment: Comment }>()
// );

// export const addCommentSuccess = createAction(
//   '[Comment] Add Comment Success',
//   props<{ comment: Comment }>()

// ); export const addCommentFailure = createAction(
//   '[Comment] Add Comment Failure',
//   props<{ error: any }>()
// );

// export const loadComments = createAction(
//   '[Comment] Load Comments',
//   props<{ articleId: number }>()
// );

// export const loadCommentsSuccess = createAction(
//   '[Comment] Load Comments Success',
//   props<{ comments: Comment[] }>()
// );

// export const loadCommentsFailure = createAction(
//   '[Comment] Load Comments Failure',
//   props<{ error: any }>()
// );