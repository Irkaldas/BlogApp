import { ActionReducerMap } from "@ngrx/store";
import { commentReducer, CommentsState } from "./comment/comment.reducer";

export interface AppState {
    comments: CommentsState,
}
