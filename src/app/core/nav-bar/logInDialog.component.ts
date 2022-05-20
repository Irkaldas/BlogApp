import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-logIn-Dialog',
  templateUrl: './logInDialog.component.html',
  styleUrls: ['./logInDialog.component.css']
})
export class LogInDialogComponent {

  constructor() { }

  @Output()
  hide: boolean = true;

}
