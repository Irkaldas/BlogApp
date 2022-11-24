import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import * as fromTags from './tag.reducer';
import { TagEffects } from './tag.effects';
import { StoreModule } from '@ngrx/store';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromTags.tagFeatureKey, fromTags.tagReducer),
    EffectsModule.forFeature([TagEffects])
  ]
})
export class TagModule { }
