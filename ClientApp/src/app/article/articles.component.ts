import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { Article } from "src/app/model/article.model";
import { AppState } from "../store/app.state";
import { loadArticles } from "../store/article/article.actions";
import { selectArticles } from "../store/article/article.selectors";
import { loadFavorites } from "../store/favorite/favorite.actions";
import { selectUserData } from "../store/user/user.selectors";

@Component({
    selector: "articles-component",
    templateUrl: "articles.component.html",
    styleUrls: ["articles.component.scss"],
})

export class ArticlesComponent implements OnInit, OnDestroy {

    constructor(private store: Store<AppState>, private activeRoute: ActivatedRoute) {
    }

    public articles$ = this.store.select(selectArticles);

    private subscribtions: Subscription = new Subscription();

    ngOnInit(): void {
        this.store.dispatch(loadArticles());
        let userId: string = "";
        this.subscribtions.add(this.store.select(selectUserData).subscribe((user) => userId = user?.id as string));
        if (userId != "" && userId != null) {
            this.store.dispatch(loadFavorites({ userId: userId }));
        }
    }

    getArticleKey(index: number, article: Article) {
        return article.id;
    }

    ngOnDestroy(): void {
        this.subscribtions.unsubscribe();
    }

}
