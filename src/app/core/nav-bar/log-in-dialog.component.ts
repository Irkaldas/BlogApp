import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-log-in-dialog',
  templateUrl: './log-in-dialog.component.html',
  styleUrls: ['./log-in-dialog.component.css']
})
export class LogInDialogComponent {

  constructor() { }
  hide: boolean = true;
}
