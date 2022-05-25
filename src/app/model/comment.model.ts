export class Comment {
    constructor(
        public id?: number, //PK
        public body?: string,
        public upVotes?: number,
        public downVotes?: number,
        public userId?: number, //FK
        public articleId?: number, //FK
    ) { }
}