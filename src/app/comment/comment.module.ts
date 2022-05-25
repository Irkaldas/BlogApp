import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments.component';
import { CommentComponent } from './comment.component';
import { CommentFormComponent } from './comment-form.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CommentsComponent, CommentComponent, CommentFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [CommentsComponent]
})
export class CommentModule { }
