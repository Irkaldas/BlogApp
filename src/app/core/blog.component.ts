import { Component } from "@angular/core";
import { Post, PostModel } from "../model/post.model";


@Component({
    selector: "blog-component",
    templateUrl: "blog.component.html",
    styleUrls: ["blog.component.scss"]
})

export class BlogComponent {

    constructor(private postModel: PostModel) { }
    getPosts(): Post[] {
        return this.postModel.posts;
    }
}