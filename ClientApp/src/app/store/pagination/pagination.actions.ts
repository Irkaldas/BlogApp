import { createActionGroup, props } from '@ngrx/store';
import { SortTypes } from '../../model/pagination.model';

export const paginationActions = createActionGroup({
  source: 'Pagination API',
  events: {
    'Load Page': props<{ page: number, sortType: SortTypes, search: String }>(),
    'Load Page Success': props<{ page: number, sortType: SortTypes, search: String, articlesIds: number[] }>()
  }
}
);
