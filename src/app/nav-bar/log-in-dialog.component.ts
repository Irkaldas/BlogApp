import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { loginUser } from '../store/user/user.actions';

@Component({
  selector: 'app-log-in-dialog',
  templateUrl: './log-in-dialog.component.html',
  styleUrls: ['./log-in-dialog.component.scss']
})
export class LogInDialogComponent {
  private user: User = new User();

  constructor(private store: Store<AppState>) { }

  public logInDialogFormGroup: LogInDialogFormGroup = new LogInDialogFormGroup();
  hide: boolean = true;
  isLogInDialog: boolean = true;

  login(): void {
    if (this.logInDialogFormGroup.valid) {
      Object.keys(this.logInDialogFormGroup.controls)
        .forEach(c => {
          this.user[c as keyof User] = this.logInDialogFormGroup.controls[c].value;
        });
      this.store.dispatch(loginUser({ email: this.user.email as string, password: this.user.password as string }))
    }
    this.logInDialogFormGroup.reset();
    this.user = new User();
  }
}

class LogInDialogControl extends FormControl {
  public label: string;
  public propertyName: string;

  constructor(label: string, popertyName: string, value: any, validator: any) {
    super(value, validator);
    this.label = label;
    this.propertyName = popertyName;
  }

  getLogInValidatorMessages(): string[] {
    let errorMessages: string[] = [];
    for (let error in this.errors) {
      switch (error) {
        case "required":
          errorMessages.push(`${this.label} field cannot be empty`);
      }
    }
    return errorMessages;
  }
}

class LogInDialogFormGroup extends FormGroup {
  constructor() {
    super({
      email: new LogInDialogControl("Email", "email", "", Validators.compose([
        Validators.required,
      ])),
      password: new LogInDialogControl("Password", "password", "", Validators.compose([
        Validators.required,
      ]))
    })
  }

  getLogInValidatorMessages(name: string): string[] {
    return (this.controls[name] as LogInDialogControl).getLogInValidatorMessages();
  }

  getLogInControls(): LogInDialogControl[] {
    return Object.keys(this.controls).
      map(c => this.controls[c] as LogInDialogControl);
  }

}
