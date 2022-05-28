import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {

  constructor() { }

  public maxCharacters: number = 200;
  public minCharacters: number = 3;
  ngOnInit(): void {
  }

}
export class CommentFormControl extends FormControl {
  constructor() {
    super();
  }
}
export class CommentFormGroup extends FormGroup {
  constructor() {
    super({

    });
  }
}
