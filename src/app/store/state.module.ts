import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentModule } from './comment/comment.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ArticleModule } from './article/article.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CommentModule,
    ArticleModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ]
})
export class StateModule { }
