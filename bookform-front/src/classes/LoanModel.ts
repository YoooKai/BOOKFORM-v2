import type {Loan} from "../interfaces/Loan";

export class LoanModel{
    constructor(private loan: Loan){}
    public get id(): string{
        return this.loan.id;
    };
    public get user_id(): string{
        return this.loan.user_id;
    };
    public get book_id(): string{
        return this.loan.book_id;
    };
    public get loan_date(): Date{
        return this.loan.loan_date;
    };
    public get return_date(): Date{
        return this.loan.return_date;
    };

    public set id(id: string){
        this.loan.id = id;
    };
    public set user_id(user_id: string){
        this.loan.user_id = user_id;
    };
    public set book_id(book_id: string){
        this.loan.book_id = book_id;
    };
    public set loan_date(loan_date: Date){
        this.loan.loan_date = loan_date;
    };
    public set return_date(return_date: Date){
        this.loan.return_date = return_date;
    };
}
