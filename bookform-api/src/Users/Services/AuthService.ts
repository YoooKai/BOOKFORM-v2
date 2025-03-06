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
    ) {}

    async incryptPassword(password: Name): Promise<Name> {
        const salt = await genSalt(10);
        const hashedPassword = await hash(password.value, salt);
        return new Name(hashedPassword);
    }

    async checkPassword(email: Name, password: Name): Promise<boolean> {
        const user = await this.userRepository.getUserByEmail(email);
        if (!user) {
            throw new Error('El usuario no existe');
        }

        return await compare(password.value, user.password.value);
    }

    async login(email: Name, password: Name): Promise<Uuid> {
        const token = new Uuid(new CustomUUID().id);
        await this.userRepository.saveAccessToken(email, token);
        return token;
    }

    async verifyToken(email: Name, bearer?: string): Promise<void> {
        if (!bearer) {
            throw new Error('Token no proporcionado.');
        }

        const user = await this.userRepository.getUserByEmail(email);
        if (!user) {
            throw new Error('El usuario no existe');
        }

        const tokenValue = this.extractToken(bearer);
        if (user.token.value !== tokenValue) {
            throw new Error('No tienes permiso');
        }
    }

    private extractToken(bearer: string): string {
        const parts = bearer.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            throw new Error('Formato de token inválido.');
        }
        return parts[1];
    }
}
