import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Favorite } from 'src/app/model/favorite.model';

export const favoritesActions = createActionGroup({
  source: 'Favorites API',
  events: {
    'Load': props<{ userId: string }>(),
    'Load Success': props<{ favorites: Favorite[] }>(),
    'Add': props<{ favorite: Favorite }>(),
    'Add Success': props<{ favorite: Favorite }>(),
    'Remove': props<{ favoriteId: number }>(),
    'Remove Success': props<{ favoriteId: number }>(),
  }
});