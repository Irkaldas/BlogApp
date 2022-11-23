import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Article } from 'src/app/model/article.model';

export const articlesActions = createActionGroup({
    source: 'Articles API',
    events: {
        'Load': emptyProps(),
        'Load Success': props<{ articles: Article[] }>(),
        'Post Article': props<{ article: Article }>(),
        'Post Article Success': props<{ article: Article }>()
    }
});
