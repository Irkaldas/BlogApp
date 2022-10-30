import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthComponent } from '../auth/auth.component';
import { AppState } from '../store/app.state';
import { articlesActions } from '../store/article/article.actions';
import { userActions } from '../store/user/user.actions';
import { selectIsUserLoggedIn, selectUserName } from '../store/user/user.selectors';
import { Subject } from 'rxjs';
import { toggleNavBar } from '../shared/animation/nav-bar-animation/nav-bar-animation';
import { DialogService } from '../shared/dialog/dialog.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  animations: [toggleNavBar]
})
export class NavBarComponent implements OnInit, OnDestroy {

  constructor(
    private store: Store<AppState>,
    private myDialog: DialogService
  ) { }

  public isLoggedIn$ = this.store.select(selectIsUserLoggedIn);
  public showSearchBar: boolean = false;
  public isOpen: boolean = false;
  public navBarOptions = [
    { nav: "Favorite articles", icon: "favorite", route: "favorite" },
    { nav: "Followed users", icon: "supervised_user_circle", route: "followed" },
    { nav: "My profile", icon: "account_circle", route: "profile" },
    { nav: "Create article", icon: "article", route: "crateArticle" }
  ];

  public userName$ = this.store.select(selectUserName);
  private readonly destroy$ = new Subject();

  ngOnInit(): void {
    this.store.dispatch(articlesActions.load());
  }

  logOut(): void {
    this.store.dispatch(userActions.logoutSuccess());
  }

  openAuthDialog() {
    this.myDialog.open(AuthComponent);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleNavBar(): void {
    this.isOpen = !this.isOpen;
  }

  onClickedOutside(): void {
    this.isOpen = false;
  }
}
