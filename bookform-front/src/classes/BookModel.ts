import type { Book } from "../interfaces/Book";

export class BookModel {
    constructor(private book: Book){}

        public get id(): string{
            return this.book.id;
        };
        public get title(): string{
            return this.book.title;
        };
        public get author(): string{
            return this.book.author;
        };
        public get available(): boolean{
            return this.book.available;
        };

        public set id(id: string){
            this.book.id = id;
        };
        public set title(title: string){
            this.book.title = title;
        };
        public set author(author: string){
            this.book.author = author;
        };
        public set available(available: boolean){
            this.book.available = available;
        };
    }
