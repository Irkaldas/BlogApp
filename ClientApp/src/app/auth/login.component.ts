import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { loginUser } from '../store/user/user.actions';
import { AppFormControl, AppFormGroup } from '../shared/app-form/app-form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  public loginFormGroup: AppFormGroup = new AppFormGroup({});
  public hide: boolean = true;

  private user: User = new User();

  ngOnInit(): void {
    this.loginFormGroup = new AppFormGroup({
      email: new AppFormControl("Email", "email", "",
        Validators.compose([
          Validators.required,
        ])),
      password: new AppFormControl("Password", "password", "",
        Validators.compose([
          Validators.required,
        ]))
    })
  }

  login(): void {
    if (this.loginFormGroup.valid) {
      Object.keys(this.loginFormGroup.controls)
        .forEach(c => {
          this.user[c as keyof User] = this.loginFormGroup.controls[c].value;
        });
      console.log(this.user);
      this.store.dispatch(loginUser({ user: this.user }));
      this.loginFormGroup.reset();
      this.user = new User();
    }
  }
}