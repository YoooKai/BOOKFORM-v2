import { inject, injectable } from "tsyringe";
import { HttpController } from "../../Shared/Infraestructure/types";
import HttpService from "../../Shared/Infraestructure/Services/HttpService";
import { Request, Response } from "express";
import { Name } from "../../Shared/Models/Name";
import { Uuid } from "../../Shared/Models/Uuid";
import { v4 as uuidv4 } from 'uuid';
import { User } from "../Model/User";
import { UserCreateServices } from "../Services/CreateUserService";
import UserRepository from "../Repository/UserRepository";
import { USERS_REPOSITORY } from "../../Shared/Infraestructure/dependency-names";
import { AuthService } from "../Services/AuthService";
import { Bool } from "../../Shared/Models/Bool";

@injectable()
export class SaveUserController implements HttpController {
    constructor(
        private httpService: HttpService,
        @inject(USERS_REPOSITORY) private userRepository: UserRepository,
    ) {}

    async execute(request: Request, response: Response): Promise<void> {
        try {
            const isNewUser = !request.body.id;
            const newUser = new Bool(isNewUser);
            const id = new Uuid(request.body.id ? request.body.id : uuidv4());
            const name = new Name(request.body.name);
            const email = new Name(request.body.email);
            const password = request.body.password ? new Name(request.body.password) : new Name("");
            const token = new Uuid(request.body.token ?? null);

            let user = new User(id, name, email, password, token);
            const userCreateService = new UserCreateServices(this.userRepository);
            const authService = new AuthService(this.userRepository);

            console.log(request.body);
            console.log(newUser)

            if (!isNewUser) {
                try {
                    await authService.verifyToken(email, request.headers['authorization'] || '');
                } catch (error: any) {
                    return this.httpService.unauthorized(response);
                }
            } 
            else if (password.value) {
                const encryptedPassword = await authService.incryptPassword(password);
                user = new User(id, name, email, encryptedPassword, token);
            }
            try {
                await userCreateService.save(user);
                this.httpService.ok(response, user);
            } catch (error: any) {
                this.httpService.badRequest(response, error.message);
            }
        } catch (error: any) {
            this.httpService.internalServerError(response, "Error al guardar el usuario.");
        }
    }
}
