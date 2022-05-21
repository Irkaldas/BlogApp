import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Article } from "../model/article.model";
import { ArticlesRepository } from "../model/articles.repository.model";


@Component({
    selector: "home-component",
    templateUrl: "home.component.html",
    styleUrls: ["home.component.scss"]
})

export class HomeComponent implements OnInit {
    public articles: Observable<Article[]> = new Observable<Article[]>();

    constructor(private articlesRepository: ArticlesRepository) {
    }

    ngOnInit() {
        this.articles = this.articlesRepository.GetArticles();
    }
}