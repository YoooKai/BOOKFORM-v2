import type { User } from "../interfaces/User";

export class UserModel {
    constructor(private user: User) {}

    public get id(): string{
        return this.user.id;
    };

    public get status(): boolean{
        return this.user.status;
    };

    public get email(): string{
        return this.user.email;
    };

    public get name(): string{
        return this.user.name;
    };



    public set id(id: string){
        this.user.id = id;
    };

    public set status(status: boolean){
        this.user.status = status;
    };

    public set email(email: string){
        this.user.email = email;
    };

    public set name(name: string){
        this.user.name = name;
    };


}