import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments.component';
import { CommentComponent } from './comment.component';
import { CommentFormComponent } from './comment-form.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentSnackBarComponent } from './comment-snack-bar.component';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';



@NgModule({
  declarations: [CommentsComponent, CommentComponent, CommentFormComponent, CommentSnackBarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: MAT_SNACK_BAR_DATA, useValue: {} }],
  exports: [CommentsComponent]
})
export class CommentModule { }
