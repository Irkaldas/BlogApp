import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavBarComponent } from './nav-bar/navBar.component';
import { RouterModule } from '@angular/router';
import { PostComponent } from './post/post.component';
import { DialogComponent } from './nav-bar/dialog.component';


@NgModule({
  declarations: [BlogComponent, NavBarComponent, PostComponent, DialogComponent],
  imports: [
    BrowserModule,
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule
  ],
  exports: [BlogComponent]
})
export class CoreModule { }
