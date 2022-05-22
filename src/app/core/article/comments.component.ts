import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CommentsRepository } from 'src/app/model/comments.repository.model';
import { Comment } from 'src/app/model/comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  public comments$: Observable<Comment[]> = new Observable<Comment[]>();
  public showComments: boolean = false;

  constructor(private commentsRepository: CommentsRepository, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params["id"];
    this.comments$ = this.commentsRepository.GetComments(id);
  }

}
