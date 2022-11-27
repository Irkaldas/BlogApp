import { createAction, createActionGroup, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Pagination, Sort } from '../../model/pagination.model';
import { Article } from 'src/app/model/article.model';

export const paginationActions = createActionGroup({
  source: 'Pagination API',
  events: {
    'Load Page': props<{ page: number, sort: Sort, search: String }>(),
    'Load Page Success': props<{ articles: Article[] }>()
  }
}
);
