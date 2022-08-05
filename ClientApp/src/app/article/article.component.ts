import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Article } from 'src/app/model/article.model';
import { AuthService } from '../services/auth.service';
import { AppState } from '../store/app.state';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {

  constructor(private authService: AuthService, private store: Store<AppState>) { }

  @Input()
  article: Article = new Article();

  public isLoggedIn$ = false;
  public isfavorite: boolean = false;
  public icon: string = "favorite_outline";


  addToFavorites(): void {
    this.isfavorite = !this.isfavorite;
    this.icon = this.isfavorite ? "favorite" : "favorite_outline";
    console.log(this.isfavorite)
  }
}
