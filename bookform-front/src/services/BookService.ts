import axios from "axios";
import { getUserToken } from "./UserSevice";
import { BookModel } from "../classes/BookModel";

const apiUrl = import.meta.env.VITE_API_URL;

export async function getBooks(author: string | null): Promise<any> {
    try{
        let query = {
            author: author ? author : null,
        }
        const response = await axios.post(apiUrl + "/get_books", query, {
            headers: {
                'Authorization': `Bearer ${await getUserToken()}`,
            }
        });
        return response.data.map((book: any) => new BookModel({
            id: book.id,
            title: book.title,
            author: book.author,
            available: book.available,
        }));
    } catch (error: any) {
        console.error('Error al obtener los libros',error);
        throw error;
    }
}

export async function updateBook(book: BookModel): Promise<any> {
    try{
        let query = {
            id: book.id ? book.id : null,
            title: book.title,
            author: book.author,
            available: book.available,
        }
        const response = await axios.post(apiUrl + "/create_book", query, {
            headers: {
                'Authorization': `Bearer ${await getUserToken()}`,
            }
        });
        return response;
    }catch(error){
        console.error('Error al actualizar el libro',error);
        throw error;
    }
}
export async function deleteBook(book: BookModel): Promise<any> {
    try{
        let query = {
            id: book.id ? book.id : null,
        }
        const response = await axios.post(apiUrl + "/delete_book", query, {
            headers: {
                'Authorization': `Bearer ${await getUserToken()}`,
            }
        });
        return response;
    }catch (error) {
        console.error('Error al eliminar el libro',error);
        throw error;
    }
}