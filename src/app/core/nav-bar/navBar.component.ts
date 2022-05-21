import { Component, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogInDialogComponent } from './logInDialog.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './navBar.component.html',
  styleUrls: ['./navBar.component.scss']
})
export class NavBarComponent {

  public navBarOptions = [
    { nav: "home", icon: "home" },
    { nav: "favorite", icon: "favorite" },
    { nav: "followed users", icon: "supervised_user_circle" },
    { nav: "edit profile", icon: "account_circle" }

  ]
  constructor(private dialog: MatDialog) { }

  @Output()
  showSearchBar: boolean = false;

  openDialog() {
    this.dialog.open(LogInDialogComponent, {
      width: '600px',
      height: '400px',
    });
  }
}
