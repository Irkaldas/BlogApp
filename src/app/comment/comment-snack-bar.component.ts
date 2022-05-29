import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-comment-snack-bar',
  templateUrl: './comment-snack-bar.component.html',
  styleUrls: ['./comment-snack-bar.component.scss']
})
export class CommentSnackBarComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
    public snackBarRef: MatSnackBarRef<CommentSnackBarComponent>) { }
}
