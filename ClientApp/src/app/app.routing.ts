import { RouterModule, Routes } from "@angular/router";
import { ArticleDetailsComponent } from "./article/article-details.component";
import { ArticlesComponent } from "./article/articles.component";
import { ArticleResolverResolver } from "./resolvers/article-resolver.resolver";
import { ErrorComponent } from "./error/error.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { FavoritesComponent } from "./article/favorites.component";
import { ArticleFormComponent } from "./article/article-form.component";

export const articleDetails: Routes = [{
    path: 'article/:id', component: ArticleDetailsComponent,
}];

const childRoutes: Routes = [
    {
        path: "crateArticle", component: ArticleFormComponent
    },
    {
        path: "favorite", component: FavoritesComponent
    },
    {
        path: "favorite/article/:id", redirectTo: "article/:id"
    },
    {
        path: "article/:id", component: ArticleDetailsComponent,
        resolve: { model: ArticleResolverResolver }
    },
    {
        path: "", component: ArticlesComponent,
    },
    {
        path: "**", component: ErrorComponent
    }
]

const routes: Routes = [
    {
        path: "", component: NavBarComponent, children: childRoutes
    }
];

export const routing = RouterModule.forRoot(routes);