import { injectable } from 'tsyringe';
import UserRepository from '../Repository/UserRepository';
import { User } from '../Model/User';

@injectable()
export class UserCreateServices {

    constructor(
        private userRepository: UserRepository,
    ) {}

        async save(user: User){
            await this.userRepository.saveUser(user);
        }
}


