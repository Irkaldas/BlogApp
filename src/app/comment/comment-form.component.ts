import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Comment } from '../model/comment.model';
import { CommentsRepository } from '../model/comments.repository.model';
import { CommentSnackBarComponent } from './comment-snack-bar.component';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent {

  constructor(private commentsRepository: CommentsRepository,
    private actieveRoute: ActivatedRoute, private snackBar: MatSnackBar) { }

  private newComment: Comment = new Comment();
  private snackBarDurationInSeconds = 5;

  public commentFormGroup: CommentFormGroup = new CommentFormGroup();
  public maxCharacters: number = 200;
  public minCharacters: number = 5;

  @Output()
  commentSubmitted = new EventEmitter<Comment>();

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
      this.commentsRepository.AddComment(this.newComment)
        .pipe(catchError(err => {
          this.openCommentSnackBar("Error occured. Couldn\'t add your comment. Try again later.", true);
          return throwError(err);
        }))
        .subscribe((comment) => {
          this.openCommentSnackBar("Your comment was successfully posted! :)", false);
          this.commentSubmitted.emit(comment);
        });
      this.newComment = new Comment();
      this.commentFormGroup.reset();
    }
  }

  openCommentSnackBar(message: string, err: boolean): void {
    this.snackBar.openFromComponent(CommentSnackBarComponent, {
      duration: this.snackBarDurationInSeconds * 1000,
      data: { message, err }
    })
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
