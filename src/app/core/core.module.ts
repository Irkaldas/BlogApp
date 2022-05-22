import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { ArticleDetailsComponent } from './article/article-details.component';
import { LogInDialogComponent } from './nav-bar/log-in-dialog.component';
import { CommentsComponent } from './article/comments.component';


@NgModule({
  declarations: [HomeComponent, NavBarComponent, ArticleDetailsComponent, LogInDialogComponent, CommentsComponent],
  imports: [
    BrowserModule,
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule
  ],
  exports: [HomeComponent]
})
export class CoreModule { }
