import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar.component';
import { ArticleModule } from '../article/article.module';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { AuthModule } from '../auth/auth.module';
import { FavoriteModule } from '../store/favorite/favorite.module';



@NgModule({
  declarations: [NavBarComponent],
  imports: [
    CommonModule,
    ArticleModule,
    MaterialModule,
    RouterModule,
    AuthModule,
    FavoriteModule
  ],
  exports: [NavBarComponent]
})
export class NavBarModule { }
