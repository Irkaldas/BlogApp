import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsService } from './comments.service';
import { AuthService } from './auth.service';
import { ArticlesService } from './articles.service';
import { REST_URL } from './articles.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    AuthService,
    CommentsService,
    ArticlesService,
    { provide: REST_URL, useValue: `http://${location.hostname}:3000` }
  ]
})
export class ServicesModule { }
