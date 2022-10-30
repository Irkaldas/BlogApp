import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { Article } from "src/app/model/article.model";
import { AppState } from "../store/app.state";
import { articlesActions } from "../store/article/article.actions";
import { selectAllArticles } from "../store/article/article.selectors";
import { favoritesActions } from "../store/favorite/favorite.actions";
import { selectUserData } from "../store/user/user.selectors";

@Component({
    selector: "articles-component",
    templateUrl: "articles.component.html",
    styleUrls: ["articles.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ArticlesComponent implements OnInit {

    constructor(
        private store: Store<AppState>
    ) { }

    public articles$ = this.store.select(selectAllArticles);

    ngOnInit(): void {
        this.store.dispatch(articlesActions.load());
    }

    getArticleKey(index: number, article: Article) {
        return article.id;
    }
}
