import { injectable } from "tsyringe";
import { hash, genSalt, compare } from 'bcryptjs';
import UserRepository from '../Repository/UserRepository';
import { Name } from '../../Shared/Models/Name';
import { Uuid } from '../../Shared/Models/Uuid';
import { CustomUUID } from "../../Shared/Infraestructure/Services/CustomUuidService";

@injectable()
export class AuthService {
    constructor(
            private userRepository: UserRepository,
        ) {};
    
    async incryptPassword(password: Name): Promise<Name> {
        const salt = await genSalt(10);
        const hashedPassword = await hash(password.value, salt);
        return new Name(hashedPassword);
    }

    async checkPassword(email: Name, password: Name): Promise<any> {
        const user = await this.userRepository.getUserByEmail(email);
        if (!user) {
            throw new Error('El usuario no existe');
        }
        const passwordMatch = await compare(password.value, user.password.value);
        if (passwordMatch) {
            return this.login(email);
        } else {
            throw new Error('Contraseña Incorrecta');
        }
    }

    async login(email: Name): Promise<Uuid> {
        const token = new Uuid((new CustomUUID()).id);
        await this.userRepository.saveAccessToken(email, token);
        return token;
    }

    async verifyToken(email: Name, token: Uuid, bearer: string): Promise<any> {
        const user = await this.userRepository.getUserByEmail(email);
        if (user) {
            if (user.token.value !== this.extractToken(bearer)) {
                throw new Error('No tienes permiso');
            }
        } else {
            throw new Error('El usuario no existe');
        }
    }

    extractToken(bearer: string): string {
        return bearer.split(' ')[1];
    }
}
