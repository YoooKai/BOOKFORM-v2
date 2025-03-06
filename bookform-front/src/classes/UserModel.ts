import type { User } from "../interfaces/User";

export class UserModel {
    constructor(private user: User) {}

    public get id(): string{
        return this.user.id;
    };

    public get email(): string{
        return this.user.email;
    };

    public get name(): string{
        return this.user.name;
    };
    public get password(): string{
        return this.user.password;
    }



    public set id(id: string){
        this.user.id = id;
    };
    public set password(password: string){
        this.user.password = password;
    };
    

    public set email(email: string){
        this.user.email = email;
    };

    public set name(name: string){
        this.user.name = name;
    };


}