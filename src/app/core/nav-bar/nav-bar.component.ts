import { Component, Input, Output } from '@angular/core';
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
    { nav: "home", icon: "home" },
    { nav: "favorite", icon: "favorite" },
    { nav: "followed users", icon: "supervised_user_circle" },
    { nav: "edit profile", icon: "account_circle" }

  ]

  constructor(private dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(LogInDialogComponent, {
      width: '600px',
      height: '400px',
    });
  }
}
