import { Injectable } from "@angular/core";
import { PostsRepository } from "./posts.repository.model";

export class Post {
    constructor(
        public id?: number,
        public userId?: number, //FK
        public title?: string,
        public body?: string,
        // public Creation_Date?: Date,
        // public Update_Date?: Date,
        // public Comments: CommentModel[] = []
    ) { }
}

@Injectable()
export class PostModel {
    public posts: Post[] = [];
    public post: Post = new Post;

    constructor(private postsRepository: PostsRepository) {
        this.postsRepository.GetPosts().subscribe(posts =>
            this.posts = posts);
    }
    GetPosts() {
        return this.posts;
    }
    GetPost(postId: number) {
        this.postsRepository.GetPost(postId).subscribe(post =>
            this.post = post);
    }

}