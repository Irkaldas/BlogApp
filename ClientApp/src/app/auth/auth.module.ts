import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginDialogComponent } from './login-dialog.component';
import { RegisterComponent } from './register.component';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [LoginDialogComponent, RegisterComponent, AuthComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
})
export class AuthModule { }
