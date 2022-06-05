import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../model/auth.service';
import { CommentsService } from './comments.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    AuthService,
    CommentsService
  ]
})
export class ServicesModule { }
