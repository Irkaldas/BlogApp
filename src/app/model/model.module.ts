import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesRepository, REST_URL } from './articles.repository.model';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    ArticlesRepository,
    { provide: REST_URL, useValue: `https://jsonplaceholder.typicode.com` }
  ]
})
export class ModelModule { }
