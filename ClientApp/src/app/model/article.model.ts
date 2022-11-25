import { Tag } from "./tag.model";

export interface Article {
    id?: number;
    title?: string;
    body?: string;
    userId?: string, //FK
    tags?: Tag[],
    date?: string
}