import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from 'src/app/model/article.model';
import { ArticlesRepository } from 'src/app/model/articles.repository.model';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent {
  public article$: Observable<Article>;

  constructor(private activeRoute: ActivatedRoute, private articleRepository: ArticlesRepository) {
    let id = this.activeRoute.snapshot.params["id"];
    this.article$ = this.articleRepository.GetArticle(id);
  }
}
