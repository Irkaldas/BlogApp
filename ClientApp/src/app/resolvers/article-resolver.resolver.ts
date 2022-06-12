import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ArticlesService } from '../services/articles.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleResolverResolver implements Resolve<any> {
  constructor(private articlesService: ArticlesService, private router: Router) { }

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.articlesService.GetArticle(activatedRouteSnapshot.params['id']).pipe(
      catchError(err => {
        // this.router.navigate(["notfound"]);
        return err;
      })
    )
  }
}
