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
  public article$: BehaviorSubject<Article> = new BehaviorSubject<Article>(new Article());
  private articleSubscribtion: Subscription = new Subscription();

  constructor(private activeRoute: ActivatedRoute, private route: Router) {
  }

  ngOnInit(): void {
    console.log(this.activeRoute.snapshot.params["id"]);

    this.articleSubscribtion.add(this.activeRoute.data.subscribe((data: any) => {
      this.article$.next(data['model']);
    }));
  }

  ngOnDestroy(): void {
    this.articleSubscribtion.unsubscribe();
  }
}
