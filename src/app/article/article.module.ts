import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article.component';
import { ArticlesComponent } from './articles.component';
import { ArticleDetailsComponent } from './article-details.component';
import { MaterialModule } from '../material/material.module';
import { CommentModule } from '../comment/comment.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ArticleComponent, ArticlesComponent, ArticleDetailsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CommentModule,
    RouterModule
  ],
  exports: [ArticlesComponent, ArticleDetailsComponent]
})
export class ArticleModule { }
