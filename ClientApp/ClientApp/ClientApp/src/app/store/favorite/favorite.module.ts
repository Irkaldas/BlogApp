import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { FavoriteEffects } from './favorite.effects';
import { StoreModule } from '@ngrx/store';
import * as fromFavorite from './favorite.reducer';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature([FavoriteEffects]),
    StoreModule.forFeature(fromFavorite.favoriteFeatureKey, fromFavorite.reducer)
  ]
})
export class FavoriteModule { }
