import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AuthComponent } from '../auth/auth.component';
import { Article } from '../model/article.model';
import { REST_URL } from '../services/articles.service';
import { AuthService } from '../services/auth.service';
import { AppState } from '../store/app.state';
import { logoutUser } from '../store/user/user.actions';
import { selectUserStatus } from '../store/user/user.selectors';

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

  public isLoggedIn$ = this.store.select(selectUserStatus);
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
}
