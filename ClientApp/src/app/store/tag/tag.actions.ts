import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Tag } from 'src/app/model/tag.model';

export const tagsActions = createActionGroup({
  source: 'Tags API',
  events: {
    'Load': emptyProps(),
    'Load Success': props<{ tags: Tag[] }>(),
  }
});
