import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentModule } from './comment/comment.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    CommentModule,
    ArticleModule,
    UserModule
  ]
})
export class StateModule { }
