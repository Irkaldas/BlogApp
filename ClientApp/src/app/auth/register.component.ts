import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { UserRegistration } from '../model/userRegistration.model';
import { AuthService } from '../services/auth.service';
import { AppFormControl, AppFormGroup } from '../shared/app-form/app-form';
import { CompareValidator } from '../shared/validators/compare.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private auth: AuthService) { }

  public registerFormGroup: AppFormGroup = new AppFormGroup({});
  public hide: boolean = true;

  private newUserRegistration: UserRegistration = new UserRegistration();

  ngOnInit(): void {
    this.registerFormGroup = new AppFormGroup({
      fullName: new AppFormControl("Full Name", "fullName", "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)])),
      email: new AppFormControl("Email", "email", "",
        Validators.compose([
          Validators.required,
          Validators.email])),
      password: new AppFormControl("Password", "password", "",
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20)])),
      confirmPassword: new AppFormControl("Confirm Password", "confirmPassword", "",
        Validators.compose([
          Validators.required,
          CompareValidator("password")
        ]))
    })
  }

  register(): void {
    if (this.registerFormGroup.valid) {
      Object.keys(this.registerFormGroup.controls)
        .forEach(c => {
          this.newUserRegistration[c as keyof UserRegistration] = this.registerFormGroup.controls[c].value;
        });
      this.auth.Register(this.newUserRegistration).subscribe({
        next: (_) => console.log("Successful registration"),
        error: (err: HttpErrorResponse) => {
          console.log("erorr occured");
          console.log(err.error.errors)
        }
      })
      this.registerFormGroup.reset();
      this.newUserRegistration = new UserRegistration();
    }
  }
}