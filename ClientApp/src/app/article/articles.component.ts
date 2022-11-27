import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { BehaviorSubject, Subscription } from "rxjs";
import { Article } from "src/app/model/article.model";
import { AppState } from "../store/app.state";
import { articlesActions } from "../store/article/article.actions";
import { selectAllArticles } from "../store/article/article.selectors";
import { favoritesActions } from "../store/favorite/favorite.actions";
import { selectUserData } from "../store/user/user.selectors";

import { SortTypes } from 'src/app/model/pagination.model';
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

    public totalPages: number = 100;
    public pages$: BehaviorSubject<Array<string>> = new BehaviorSubject<Array<any>>([]);
    public activePage: number = 1;
    public articles$ = this.store.select(selectAllArticles);
    public sortTypes: SortTypes = ['descending', 'ascending'];

    getPagination(activatedPage: number): void {
        this.activePage = activatedPage;

        //this.store.dispatch();
        let newPagination: any[] = new Array<any>();
        let left = this.activePage - 2 > 1 ? this.activePage - 2 : 1;
        let right = this.activePage + 2 < this.totalPages ? this.activePage + 2 : this.totalPages;

        if (left > 1) newPagination.push(1);
        if (left > 2) newPagination.push('...');

        Array.from({ length: 5 }, (v, k) => k + left).forEach((pageNumber) => {
            if (pageNumber <= right) {
                newPagination.push(pageNumber);
            }
        });

        if (right < this.totalPages - 1) newPagination.push('...');
        if (right < this.totalPages) newPagination.push(this.totalPages);

        this.pages$.next(newPagination);
    }


    ngOnInit(): void {
        this.getPagination(this.activePage);
        this.store.dispatch(articlesActions.load());
    }

    getArticleKey(index: number, article: Article) {
        return article.id;
    }
}
