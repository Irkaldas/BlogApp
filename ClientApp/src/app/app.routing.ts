import { RouterModule, Routes } from "@angular/router";
import { BlogComponent } from "./core/blog.component";
import { NavBarComponent } from "./core/nav-bar/navBar.component";

const childRoutes: Routes = [
    {
        path: "", component: BlogComponent
    },
    {
        path: "posts", component: BlogComponent
    }
]

const routes: Routes = [
    {
        path: "", component: NavBarComponent, children: childRoutes
    },
    {
        path: "home", component: BlogComponent
    }
];

export const routing = RouterModule.forRoot(routes);