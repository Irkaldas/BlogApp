import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar.component';
import { LogInDialogComponent } from './log-in-dialog.component';
import { ArticleModule } from '../article/article.module';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [NavBarComponent, LogInDialogComponent],
  imports: [
    CommonModule,
    ArticleModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [NavBarComponent]
})
export class NavBarModule { }
