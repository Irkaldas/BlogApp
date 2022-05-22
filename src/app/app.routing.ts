import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./core/home.component";
import { NavBarComponent } from "./core/nav-bar/nav-bar.component";
import { ArticleDetailsComponent } from "./core/article/article-details.component";

const childRoutes: Routes = [
    {
        path: "", component: HomeComponent
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