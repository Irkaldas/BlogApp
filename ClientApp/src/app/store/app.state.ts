import { ArticlesState } from "./article/article.reducer";
import { CommentsState } from "./comment/comment.reducer";
import { FavoritesState } from "./favorite/favorite.reducer";
import { UserState } from "./user/user.reducer";

export interface AppState {
    comments: CommentsState,
    articles: ArticlesState,
    favorites: FavoritesState,
    user: UserState
}
