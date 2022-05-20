import { Component } from "@angular/core";
import { Post, PostModel } from "../model/post.model";


@Component({
    selector: "home-component",
    templateUrl: "home.component.html",
    styleUrls: ["home.component.scss"]
})

export class HomeComponent {

    constructor(private postModel: PostModel) { }
    getPosts(): Post[] {
        return this.postModel.posts;
    }
}