import axios from "axios";
import { getUserToken } from "./UserSevice";
import { LoanModel } from "../classes/LoanModel";

const apiUrl = import.meta.env.VITE_API_URL;

export async function getLoans(user_id: string | null, book_id: string | null): Promise<any> {
    try{
        let query = {
            user_id: user_id ? user_id : null,
            book_id: book_id ? book_id : null,
        }
        const response = await axios.post(apiUrl + "/get_loans", query, {
            headers: {
                'Authorization': `Bearer ${await getUserToken()}`,
            }
        });
        return response.data.map((loan: any) => new LoanModel({
            id: loan.id,
            user_id: loan.user_id,
            book_id: loan.book_id,
            loan_date: loan.loan_date,
            return_date: loan.return_date
        }));
    }catch(error: any) {
        console.error('Error al obtener los préstamos', error);
        throw error;
    }
}

export async function updateLoan(loan: LoanModel): Promise<any> {
    try{
        let query = {
            id: loan.id ? loan.id : null,
            user_id: loan.user_id,
            book_id: loan.book_id,
            loan_date: loan.loan_date,
            return_date: loan.return_date,
        }
        const response = await axios.post(apiUrl + "/create_loan", query, {
            headers: {
                'Authorization': `Bearer ${await getUserToken()}`,
            }
        });
        return response;
    } catch(error) {
        console.error('Error al actualizar el préstamo', error);
        throw error;
    }
}
export async function deleteLoan(loan: LoanModel): Promise<any> {
    try {
        let query = {
            id: loan.id ? loan.id : null,
        }
        const response = await axios.post(apiUrl + "/delete_loan", query, {
            headers: {
                'Authorization': `Bearer ${await getUserToken()}`,
            }
        });
        return response;
    } catch(error){
        console.error('Error al eliminar el préstamo', error);
        throw error;
    }
}