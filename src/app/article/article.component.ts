import { Component, Input } from '@angular/core';
import { Article } from 'src/app/model/article.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {

  constructor() { }

  @Input()
  article: Article = new Article();
}
