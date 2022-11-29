import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { BehaviorSubject, observable, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Article } from "src/app/model/article.model";
import { AppState } from "../store/app.state";
import { selectAllArticles } from "../store/article/article.selectors";
import { Pagination, sortTypes, SortTypes } from 'src/app/model/pagination.model';
import { paginationActions } from "../store/pagination/pagination.actions";
import { ArticleComponent } from "./article.component";
import { selectPage, selectPageArticles } from "../store/pagination/pagination.selectors";

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

    public articles$: Observable<Article[]> = new Observable<Article[]>();
    public pages$: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
    public pageInfo$: Observable<Pagination | undefined> = new Observable<Pagination | undefined>();
    public activePage: number = 1;
    public sortTypes = typeof sortTypes;
    public sortBy: SortTypes = 'newest';
    public search: string = '';

    getPagination(activatedPage: number): void {

        this.activePage = activatedPage;
        let totalPages: number = 0;

        this.store.dispatch(paginationActions.loadPage({ page: this.activePage, search: this.search, sortType: this.sortBy }));
        this.pageInfo$ = this.store.select(selectPage(this.activePage, this.sortBy, this.search))
            .pipe(
                tap((pageInfo) => totalPages = pageInfo?.totalPages as number));
        this.articles$ = this.store.select(selectPageArticles(this.activePage, this.sortBy, this.search));

        let newPages: any[] = new Array<any>();
        let left = this.activePage - 2 > 1 ? this.activePage - 2 : 1;
        let right = this.activePage + 2 < totalPages ? this.activePage + 2 : totalPages;

        if (left > 1) newPages.push(1);
        if (left > 2) newPages.push('...');

        Array.from({ length: 5 }, (v, k) => k + left).forEach((pageNumber) => {
            if (pageNumber <= right) {
                newPages.push(pageNumber);
            }
        });

        if (right < totalPages - 1) newPages.push('...');
        if (right < totalPages) newPages.push(totalPages);

        this.pages$.next(newPages);
    }

    ngOnInit(): void {
        this.getPagination(this.activePage);
    }

    getArticleKey(index: number, article: Article) {
        return article.id;
    }
}
