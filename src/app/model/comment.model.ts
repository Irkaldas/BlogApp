export class Comment {
    constructor(
        public id?: number, //PK
        public postId?: number, //FK
        public email?: string,
        public name?: string, //FK
        public body?: string
    ) { }
}