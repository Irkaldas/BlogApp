import { RouterModule, Routes } from "@angular/router";
import { ArticleDetailsComponent } from "./article/article-details.component";
import { ArticlesComponent } from "./article/articles.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";

const childRoutes: Routes = [
    {
        path: "", component: ArticlesComponent
    },
    {
        path: "article/:id", component: ArticleDetailsComponent
    },
]

const routes: Routes = [
    {
        path: "", component: NavBarComponent, children: childRoutes
    }
];

export const routing = RouterModule.forRoot(routes);