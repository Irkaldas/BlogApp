import { RouterModule, Routes } from "@angular/router";
import { ArticleDetailsComponent } from "./article/article-details.component";
import { ArticlesComponent } from "./article/articles.component";
import { SingleItemResolverResolver } from "./resolvers/single-item-resolver.resolver";
import { ErrorComponent } from "./error/error.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";

const childRoutes: Routes = [
    {
        path: "", component: ArticlesComponent
    },
    {
        path: "article/:id", component: ArticleDetailsComponent, resolve: { model: SingleItemResolverResolver }
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