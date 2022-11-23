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
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SanitizeHtmlPipe } from '../shared/pipe/sanitizeHTML.pipe';

@NgModule({
  declarations: [
    ArticleComponent,
    ArticlesComponent,
    ArticleDetailsComponent,
    ArticleFormComponent,
    FavoritesComponent,
    SanitizeHtmlPipe
  ],
  imports: [
    CommonModule,
    CommentModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule
  ],
  providers: [
  ],
  exports: [ArticlesComponent, ArticleDetailsComponent, ArticleFormComponent]
})
export class ArticleModule { }
