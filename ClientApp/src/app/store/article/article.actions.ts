import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Article } from 'src/app/model/article.model';
import { SortTypes } from 'src/app/model/pagination.model';

export const articlesActions = createActionGroup({
    source: 'Articles API',
    events: {
        'Load': props<{ page: number, sortType: SortTypes, search: String }>(),
        'Load Success': props<{ articles: Article[] }>(),
        'Post Article': props<{ article: Article }>(),
        'Post Article Success': props<{ article: Article }>()
    }
});
