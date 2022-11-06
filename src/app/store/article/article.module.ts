import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { ArticleEffects } from './article.effects';
import { StoreModule } from '@ngrx/store';

import * as fromArticle from './article.reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromArticle.articleFeatureKey, fromArticle.articleReducer),
    EffectsModule.forFeature([ArticleEffects])
  ]
})
export class ArticleModule { }
