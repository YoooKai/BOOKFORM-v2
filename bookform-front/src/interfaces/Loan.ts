export interface Loan {
    id: string;
    user_id: string;
    book_id: string;
    loan_date: Date;
    return_date: Date;
}