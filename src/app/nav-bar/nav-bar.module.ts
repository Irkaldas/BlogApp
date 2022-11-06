import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar.component';
import { ArticleModule } from '../article/article.module';
import { RouterModule } from '@angular/router';
import { AuthModule } from '../auth/auth.module';
import { FavoriteModule } from '../store/favorite/favorite.module';



@NgModule({
  declarations: [
    NavBarComponent
  ],
  imports: [
    CommonModule,
    ArticleModule,
    RouterModule,
    AuthModule,
    FavoriteModule
  ],
  providers: [],
  exports: [NavBarComponent]
})
export class NavBarModule { }
