import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article.component';
import { ArticlesComponent } from './articles.component';
import { ArticleDetailsComponent } from './article-details.component';
import { CommentModule } from '../comment/comment.module';
import { RouterModule } from '@angular/router';
import { ArticleFormComponent } from './article-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FavoritesComponent } from './favorites.component';

@NgModule({
  declarations: [
    ArticleComponent,
    ArticlesComponent,
    ArticleDetailsComponent,
    ArticleFormComponent,
    FavoritesComponent
  ],
  imports: [
    CommonModule,
    CommentModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [ArticlesComponent, ArticleDetailsComponent, ArticleFormComponent]
})
export class ArticleModule { }
