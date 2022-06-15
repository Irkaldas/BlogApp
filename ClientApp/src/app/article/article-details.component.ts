import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Article } from 'src/app/model/article.model';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {

  constructor(private activeRoute: ActivatedRoute) { }

  public article$: BehaviorSubject<Article> = new BehaviorSubject<Article>(new Article());

  private articleSubscribtion: Subscription = new Subscription();

  ngOnInit(): void {
    this.articleSubscribtion.add(this.activeRoute.data.subscribe((data: any) => {
      this.article$.next(data['model']);
    }));
  }

  ngOnDestroy(): void {
    this.articleSubscribtion.unsubscribe();
  }
}
