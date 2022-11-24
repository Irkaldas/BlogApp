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
});