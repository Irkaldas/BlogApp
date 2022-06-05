import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentModule } from './comment/comment.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CommentModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ]
})
export class StateModule { }
