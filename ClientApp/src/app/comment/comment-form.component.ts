import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Comment } from '../model/comment.model';
import { AppState } from '../store/app.state';
import { addComment } from '../store/comment/comment.actions';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent {
  constructor(
    private actieveRoute: ActivatedRoute,
    private store: Store<AppState>) { }

  private newComment: Comment = new Comment();

  public commentFormGroup: CommentFormGroup = new CommentFormGroup();
  public maxCharacters: number = 200;
  public minCharacters: number = 5;

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

class CommentFormControl extends FormControl {
  public label: string;
  public modelProperty: string;

  constructor(label: string, property: string, value: any, validator: any) {
    super(value, validator);
    this.label = label;
    this.modelProperty = property;
  }

  getCommentValidatorMessages() {
    let errorMessages: string[] = [];
    if (this.errors) {
      for (let error in this.errors) {
        switch (error) {
          case "required":
            errorMessages.push(`Add text to post a comment.`);
            break;
          case "minlength":
            errorMessages.push(`Comment must be at least 
              ${this.errors['minlength'].requiredLength} characters long.`);
            break;
        }
      }
    }
    return errorMessages;
  }
}

class CommentFormGroup extends FormGroup {
  constructor() {
    super({
      body: new CommentFormControl("Body", "body", "",
        Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ])),
    });
  }

  getCommentValidatorMessages(name: string): string[] {
    return (this.controls[name] as CommentFormControl).getCommentValidatorMessages();
  }


}
