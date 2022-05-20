import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post, PostModel } from 'src/app/model/post.model';
import { PostsRepository } from 'src/app/model/posts.repository.model';

@Component({
  selector: 'app-article-details',
  templateUrl: './articleDetails.component.html',
  styleUrls: ['./articleDetails.component.scss']
})
export class ArticleDetailsComponent {

  public post: Post = new Post();
  constructor(private activeRoute: ActivatedRoute, private postRepository: PostsRepository) {
    let id = this.activeRoute.snapshot.params["id"];
    this.postRepository.GetPost(id).subscribe(
      post => this.post = post);
  }
}
