import { injectable } from 'tsyringe';
import UserRepository from '../Repository/UserRepository';
import { User } from '../Model/User';
import { UuidOptional } from '../../Shared/Models/UuidOptional';
import { Bool } from '../../Shared/Models/Bool';

@injectable()
export class UserCreateServices {

    constructor(
        private userRepository: UserRepository,
    ) {}

        async save(user: User){
            await this.userRepository.saveUser(user);
        }
}


