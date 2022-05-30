export class Article {
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