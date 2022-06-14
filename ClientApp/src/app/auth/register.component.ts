import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AppFormControl, AppFormGroup } from '../shared/app-form/app-form';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  public registerFormGroup!: AppFormGroup;
  public hide: boolean = true;

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
        Validators.required)
    }),
      { validators: passwordMatchingValidatior };
  }
}

export const passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password?.value === confirmPassword?.value ? null : { notmatched: true };
};