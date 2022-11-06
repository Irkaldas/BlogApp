import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments.component';
import { CommentComponent } from './comment.component';
import { CommentFormComponent } from './comment-form.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CommentsComponent, CommentComponent, CommentFormComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  exports: [CommentsComponent]
})
export class CommentModule { }
