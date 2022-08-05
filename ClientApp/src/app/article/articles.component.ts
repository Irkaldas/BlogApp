import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Article } from "src/app/model/article.model";
import { AppState } from "../store/app.state";
import { loadArticles } from "../store/article/article.actions";
import { selectArticles } from "../store/article/article.selectors";
import { loadFavorites } from "../store/favorite/favorite.actions";

@Component({
    selector: "articles-component",
    templateUrl: "articles.component.html",
    styleUrls: ["articles.component.scss"],
})

export class ArticlesComponent implements OnInit {

    constructor(private store: Store<AppState>, private activeRoute: ActivatedRoute) {
    }

    public articles$ = this.store.select(selectArticles);

    ngOnInit(): void {
        this.store.dispatch(loadArticles());
        this.store.dispatch(loadFavorites());
    }

    getArticleKey(index: number, article: Article) {
        return article.id;
    }
}
