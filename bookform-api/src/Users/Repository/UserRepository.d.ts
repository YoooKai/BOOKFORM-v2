import { UUID } from "crypto";
import { Bool } from "../../Shared/Models/Bool";
import { NameOptional } from "../../Shared/Models/NameOptional";
import { UuidOptional } from "../../Shared/Models/UuidOptional";
import { Uuid } from "../../Shared/Models/Uuid";


export default interface UserRepository {

    getUserByEmail(email: Name): Promise<User>;

    getUserById(id: Uuid): Promise<User>;

    getUsers(name: NameOptional, email: NameOptional): Promise<User[]>;

    saveUser(user: User): Promise<void>;

    removeUser(email: Name): Promise<void>;
    
    saveAccessToken(name: Name, token: Uuid): Promise<void>;
}
