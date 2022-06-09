import { RouterModule, Routes } from "@angular/router";
import { ArticleDetailsComponent } from "./article/article-details.component";
import { ArticlesComponent } from "./article/articles.component";
import { ArticleResolverResolver } from "./resolvers/article-resolver.resolver";
import { ErrorComponent } from "./error/error.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";

const childRoutes: Routes = [
    {
        path: "", component: ArticlesComponent, data: { viewOption: "all" }
    },
    {
        path: "favorites", component: ArticlesComponent, data: { viewOption: "favorites" }
    },
    {
        path: "article/:id", component: ArticleDetailsComponent, resolve: { model: ArticleResolverResolver }
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