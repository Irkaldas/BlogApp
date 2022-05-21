import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/model/article.model';
import { ArticlesRepository } from 'src/app/model/articles.repository.model';

@Component({
  selector: 'app-article-details',
  templateUrl: './articleDetails.component.html',
  styleUrls: ['./articleDetails.component.scss']
})
export class ArticleDetailsComponent {

  public article: Article = new Article();
  constructor(private activeRoute: ActivatedRoute, private articleRepository: ArticlesRepository) {
    let id = this.activeRoute.snapshot.params["id"];
    this.articleRepository.GetArticle(id).subscribe(
      article => this.article = article);
  }
}
