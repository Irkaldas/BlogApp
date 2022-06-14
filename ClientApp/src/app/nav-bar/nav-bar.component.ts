import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AuthComponent } from '../auth/auth.component';
import { Article } from '../model/article.model';
import { REST_URL } from '../services/articles.service';
import { AuthService } from '../services/auth.service';
import { AppState } from '../store/app.state';
import { logoutUser } from '../store/user/user.actions';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  constructor(private dialog: MatDialog,
    private authService: AuthService,
    private store: Store<AppState>,
    @Inject(REST_URL) private url: string
  ) { }

  public isLoggedIn$ = false;
  public showSearchBar: boolean = false;
  public navBarOptions = [
    { nav: "Favorite articles", icon: "favorite", route: "favorites" },
    { nav: "Followed users", icon: "supervised_user_circle", route: "followed" },
    { nav: "My profile", icon: "account_circle", route: "profile" },
    { nav: "Create article", icon: "article", route: "crateArticle" }
  ]

  logOut(): void {
    this.store.dispatch(logoutUser());
  }

  openAuthDialog() {
    this.dialog.open(AuthComponent, {
      width: "30%",
    });
  }
  private articles: Article[] = [];
  sendRequest(): void {
    console.log("Request send.");
    this.authService.SendRequest<Article[]>("GET", `${this.url}/articles?id=favorites.articleId&favorites.userId=1`)
      .subscribe(articles => this.articles = articles);
  }
}
