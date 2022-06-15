import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Comment } from '../model/comment.model';
import { AppFormControl, AppFormGroup } from '../shared/app-form/app-form';
import { AppState } from '../store/app.state';
import { addComment } from '../store/comment/comment.actions';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {

  constructor(
    private actieveRoute: ActivatedRoute,
    private store: Store<AppState>) { }

  public commentFormGroup: AppFormGroup = new AppFormGroup({});
  public maxCharacters: number = 200;
  public minCharacters: number = 5;

  private newComment: Comment = new Comment();

  ngOnInit(): void {
    this.commentFormGroup = new AppFormGroup({
      body: new AppFormControl("Body", "body", "",
        Validators.compose([
          Validators.required,
          Validators.minLength(this.minCharacters),
          Validators.maxLength(this.maxCharacters)
        ]))
    })
  }

  submitComment(): void {
    if (this.commentFormGroup.valid) {
      this.newComment = {
        userId: 2,
        articleId: this.actieveRoute.snapshot.params["id"],
        downVotes: 0,
        upVotes: 0,
      }

      Object.keys(this.commentFormGroup.controls)
        .forEach(c => {
          this.newComment[c as keyof Comment] = this.commentFormGroup.controls[c].value;
        });

      this.store.dispatch(addComment({ comment: this.newComment }));
      this.newComment = new Comment();
      this.commentFormGroup.reset();
    }
  }
}