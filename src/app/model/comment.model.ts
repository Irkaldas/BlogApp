export class CommentModel {
    constructor(
        public id?: number, //PK
        public articleId?: number, //FK
        public userId?: number, //FK
        public body?: string
    ) { }
}