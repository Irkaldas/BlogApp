import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesRepository, REST_URL } from './articles.repository.model';
import { AuthService } from './auth.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    ArticlesRepository,
    AuthService,
    { provide: REST_URL, useValue: `http://${location.hostname}:3000` }
  ]
})
export class ModelModule { }
