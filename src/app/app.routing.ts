import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./core/home.component";
import { NavBarComponent } from "./core/nav-bar/navBar.component";
import { ArticleDetailsComponent } from "./core/article/articleDetails.component";

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