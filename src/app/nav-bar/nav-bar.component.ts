import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogInDialogComponent } from './log-in-dialog.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  showSearchBar: boolean = false;

  public navBarOptions = [
    { nav: "Home", icon: "home", route: "" },
    { nav: "Favorite articles", icon: "favorite", route: "favorites" },
    { nav: "Followed users", icon: "supervised_user_circle", route: "followed" },
    { nav: "My profile", icon: "account_circle", route: "profile" },
    { nav: "Create article", icon: "article", route: "crateArticle" }

  ]

  constructor(private dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(LogInDialogComponent, {
      width: '600px',
      height: '400px',
    });
  }
}
