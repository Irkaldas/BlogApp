import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { loginUser } from '../store/user/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private user: User = new User();

  constructor(private store: Store<AppState>) { }

  public loginFormGroup: LoginFormGroup = new LoginFormGroup();
  public hide: boolean = true;

  login(): void {
    if (this.loginFormGroup.valid) {
      Object.keys(this.loginFormGroup.controls)
        .forEach(c => {
          this.user[c as keyof User] = this.loginFormGroup.controls[c].value;
        });
      this.store.dispatch(loginUser({ user: this.user }))
    }
    this.loginFormGroup.reset();
    this.user = new User();
  }
}

class LoginControl extends FormControl {
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

class LoginFormGroup extends FormGroup {
  constructor() {
    super({
      email: new LoginControl("Email", "email", "", Validators.compose([
        Validators.required,
      ])),
      password: new LoginControl("Password", "password", "", Validators.compose([
        Validators.required,
      ]))
    })
  }

  getLogInValidatorMessages(name: string): string[] {
    return (this.controls[name] as LoginControl).getLogInValidatorMessages();
  }

  getLogInControls(): LoginControl[] {
    return Object.keys(this.controls).
      map(c => this.controls[c] as LoginControl);
  }

}
