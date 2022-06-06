import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Article } from "src/app/model/article.model";
import { AppState } from "../store/app.state";
import { loadArticles } from "../store/article/article.actions";
import { selectAllArticles } from "../store/article/article.selectors";
import { selectAllComments } from "../store/comment/comment.selectors";

@Component({
    selector: "articles-component",
    templateUrl: "articles.component.html",
    styleUrls: ["articles.component.scss"],
})

export class ArticlesComponent implements OnInit {
    public articles$ = this.store.select(selectAllArticles)

    constructor(private store: Store<AppState>) {
    }

    ngOnInit(): void {
        this.store.dispatch(loadArticles())
    }
    getArticleKey(index: number, article: Article) {
        return article.id;
    }
}