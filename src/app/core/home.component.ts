import { Component } from "@angular/core";
import { Article } from "../model/article.model";
import { ArticlesRepository } from "../model/articles.repository.model";


@Component({
    selector: "home-component",
    templateUrl: "home.component.html",
    styleUrls: ["home.component.scss"]
})

export class HomeComponent {

    public articles: Article[] = [];
    constructor(private articlesRepository: ArticlesRepository) {
        this.articlesRepository.GetArticles().subscribe(
            articles => this.articles = articles
        );
    }
}