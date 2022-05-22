import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Article } from "../model/article.model";
import { ArticlesRepository } from "../model/articles.repository.model";


@Component({
    selector: "home-component",
    templateUrl: "home.component.html",
    styleUrls: ["home.component.scss"]
})

export class HomeComponent implements OnInit {
    public articles$: Observable<Article[]> = new Observable<Article[]>();
    public loadMore: boolean = false;
    @Input()
    public page: number = 1;
    constructor(private articlesRepository: ArticlesRepository) {
    }

    ngOnInit(): void {
        this.articles$ = this.articlesRepository.GetArticles(this.page);
    }
}