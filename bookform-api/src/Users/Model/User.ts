import { Bool } from "../../Shared/Models/Bool";
import { Name } from "../../Shared/Models/Name";
import { Uuid } from "../../Shared/Models/Uuid";
import { UserPrimitives } from "./UserPrimitives";

export class User {

    static fromPrimitives(data: UserPrimitives): User {
        const id = new Uuid(data.id);
        const name = new Name(data.name);
        const email = new Name(data.email);
        const password = new Name(data.password);
        const token = new Uuid(data.token);

        return new User(id, name, email, password, token);
    }
    constructor(
        public readonly id: Uuid,
        public readonly name: Name,
        public readonly email: Name,
        public readonly password: Name,
        public readonly token: Uuid
    ){}

    getPrimitives(): UserPrimitives {
        return {
            id: this.id.value,
            name: this.name.value,
            email: this.email.value,
            password: this.password.value,
            token: this.token.value,
        }
    }
}