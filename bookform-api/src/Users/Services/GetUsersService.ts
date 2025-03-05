import { NameOptional } from "../../Shared/Models/NameOptional";
import UserRepository from "../Repository/UserRepository";

export class GetUsersService {

    constructor(
        private userRepository: UserRepository,
    ) {}

    async execute(name: NameOptional, email: NameOptional): Promise<any> {
        return await this.userRepository.getUsers(name, email);
    }

}
