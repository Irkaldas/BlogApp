import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRoutes } from '@angular/router';
import { PostsRepository, REST_URL } from './posts.repository.model';
import { PostModel } from './post.model';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    PostModel,
    PostsRepository,
    { provide: REST_URL, useValue: `https://jsonplaceholder.typicode.com` }
  ]
})
export class ModelModule { }
