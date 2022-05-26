import { Component } from '@angular/core';

@Component({
  selector: 'app-log-in-dialog',
  templateUrl: './log-in-dialog.component.html',
  styleUrls: ['./log-in-dialog.component.scss']
})
export class LogInDialogComponent {

  constructor() { }
  hide: boolean = true;
  isLogInDialog: boolean = true;
}
