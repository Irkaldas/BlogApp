import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavBarComponent } from './nav-bar/navBar.component';
import { RouterModule } from '@angular/router';
import { ArticleDetailsComponent } from './article/articleDetails.component';
import { LogInDialogComponent } from './nav-bar/logInDialog.component';


@NgModule({
  declarations: [HomeComponent, NavBarComponent, ArticleDetailsComponent, LogInDialogComponent],
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
