import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { REST_URL } from './articles.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    { provide: REST_URL, useValue: `https://localhost:7095/api` }
  ]
})
export class ServicesModule { }
