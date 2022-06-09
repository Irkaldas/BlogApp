import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AuthComponent } from '../auth/auth.component';
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
    private store: Store<AppState>
  ) { }

  public isLoggedIn$ = this.authService.isLoggedIn$;
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
