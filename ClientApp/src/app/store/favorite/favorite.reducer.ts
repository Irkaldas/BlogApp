import { state } from '@angular/animations';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Favorite } from 'src/app/model/favorite.model';
import { favoritesActions } from './favorite.actions';


export const favoriteFeatureKey = 'favorites';

export interface FavoritesState extends EntityState<Favorite> {
}

export const favoritesAdapter: EntityAdapter<Favorite> = createEntityAdapter<Favorite>();

export const initialFavoritesState: FavoritesState = favoritesAdapter.getInitialState();

export const reducer = createReducer(
  initialFavoritesState,
  on(favoritesActions.loadSuccess, (state, { favorites }) =>
    favoritesAdapter.setAll(favorites, state)
  ),
  on(favoritesActions.addSuccess, (state, { favorite }) =>
    favoritesAdapter.addOne(favorite, state)
  ),
  on(favoritesActions.removeSuccess, (state, { favoriteId }) =>
    favoritesAdapter.removeOne(favoriteId, state)
  )
);
