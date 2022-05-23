import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { ArticleDetailsComponent } from './article/article-details.component';
import { LogInDialogComponent } from './nav-bar/log-in-dialog.component';
import { ArticlesComponent } from './article/articles.component';
import { CommentsComponent } from './comment/comments.component';
import { CommentComponent } from './comment/comment.component';
import { CommentFormComponent } from './comment/comment-form.component';


@NgModule({
  declarations: [ArticlesComponent, NavBarComponent, ArticleDetailsComponent, LogInDialogComponent,
    CommentsComponent, CommentComponent, CommentFormComponent],
  imports: [
    BrowserModule,
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule
  ],
  exports: [ArticlesComponent]
})
export class CoreModule { }
