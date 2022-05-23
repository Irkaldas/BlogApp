import { RouterModule, Routes } from "@angular/router";
import { NavBarComponent } from "./core/nav-bar/nav-bar.component";
import { ArticleDetailsComponent } from "./core/article/article-details.component";
import { ArticlesComponent } from "./core/article/articles.component";

const childRoutes: Routes = [
    {
        path: "", component: ArticlesComponent
    },
    {
        path: "article/:id", component: ArticleDetailsComponent
    }
]

const routes: Routes = [
    {
        path: "", component: NavBarComponent, children: childRoutes
    }
];

export const routing = RouterModule.forRoot(routes);