import { ActionReducerMap } from "@ngrx/store";
import { ArticlesState } from "./article/article.reducer";
import { commentReducer, CommentsState } from "./comment/comment.reducer";

export interface AppState {
    comments: CommentsState,
    articles: ArticlesState
}
