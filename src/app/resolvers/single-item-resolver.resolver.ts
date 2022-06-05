import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ArticlesRepository } from '../model/articles.repository.model';

@Injectable({
  providedIn: 'root'
})
export class SingleItemResolverResolver implements Resolve<any> {
  constructor(private articlesRepository: ArticlesRepository, private router: Router) { }

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.articlesRepository.GetArticle(activatedRouteSnapshot.params['id']).pipe(
      catchError(err => {
        this.router.navigate(["**"]);
        return err;
      })
    )
  }
}
