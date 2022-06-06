import { Component } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-log-in-dialog',
  templateUrl: './log-in-dialog.component.html',
  styleUrls: ['./log-in-dialog.component.scss']
})
export class LogInDialogComponent {
  private userLogin: User = new User();

  constructor(private authService: AuthService) { }

  public logInDialogFormGroup: LogInDialogFormGroup = new LogInDialogFormGroup();
  hide: boolean = true;
  isLogInDialog: boolean = true;

  login(): void {
    if (this.logInDialogFormGroup.valid) {


      this.authService.Login('asdasd', "asdasd").pipe(
        tap((reposnse: any) => {
          localStorage.setItem('user auth', reposnse.token)
        })
      )
    }
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
