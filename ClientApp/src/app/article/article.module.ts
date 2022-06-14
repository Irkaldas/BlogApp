import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article.component';
import { ArticlesComponent } from './articles.component';
import { ArticleDetailsComponent } from './article-details.component';
import { MaterialModule } from '../material/material.module';
import { CommentModule } from '../comment/comment.module';
import { RouterModule } from '@angular/router';
import { ArticleFormComponent } from './article-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ArticleComponent, ArticlesComponent, ArticleDetailsComponent, ArticleFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CommentModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ArticlesComponent, ArticleDetailsComponent, ArticleFormComponent]
})
export class ArticleModule { }
