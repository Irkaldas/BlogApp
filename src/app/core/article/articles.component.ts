import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Article } from "src/app/model/article.model";
import { ArticlesRepository } from "src/app/model/articles.repository.model";


@Component({
    selector: "articles-component",
    templateUrl: "articles.component.html",
    styleUrls: ["articles.component.scss"],
})

export class ArticlesComponent {
    public articles$: Observable<Article[]>;

    constructor(private articlesRepository: ArticlesRepository) {
        this.articles$ = this.articlesRepository.GetArticles();
    }

    articlesTruckBy(index: number, value: any) {
        return index;
    }
}