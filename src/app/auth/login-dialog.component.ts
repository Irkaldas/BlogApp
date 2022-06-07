import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { loginUser } from '../store/user/user.actions';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {
  private user: User = new User();

  constructor(private store: Store<AppState>) { }

  public loginDialogFormGroup: LoginDialogFormGroup = new LoginDialogFormGroup();
  public hide: boolean = true;

  login(): void {
    if (this.loginDialogFormGroup.valid) {
      Object.keys(this.loginDialogFormGroup.controls)
        .forEach(c => {
          this.user[c as keyof User] = this.loginDialogFormGroup.controls[c].value;
        });
      this.store.dispatch(loginUser({ user: this.user }))
    }
    this.loginDialogFormGroup.reset();
    this.user = new User();
  }
}

class LoginDialogControl extends FormControl {
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

class LoginDialogFormGroup extends FormGroup {
  constructor() {
    super({
      email: new LoginDialogControl("Email", "email", "", Validators.compose([
        Validators.required,
      ])),
      password: new LoginDialogControl("Password", "password", "", Validators.compose([
        Validators.required,
      ]))
    })
  }

  getLogInValidatorMessages(name: string): string[] {
    return (this.controls[name] as LoginDialogControl).getLogInValidatorMessages();
  }

  getLogInControls(): LoginDialogControl[] {
    return Object.keys(this.controls).
      map(c => this.controls[c] as LoginDialogControl);
  }

}
