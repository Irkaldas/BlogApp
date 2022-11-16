export interface Article {
    id?: number;
    title?: string;
    prewiev?: string;
    body?: string;
    userId?: string, //FK
    tags?: number[]
}