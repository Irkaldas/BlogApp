import { Component, Input, Output } from '@angular/core';

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
  constructor() { }

  @Output()
  showSearchBar: boolean = true;

}
