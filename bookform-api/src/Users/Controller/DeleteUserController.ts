import { inject, injectable } from "tsyringe";
import { HttpController } from "../../Shared/Infraestructure/types";
import HttpService from "../../Shared/Infraestructure/Services/HttpService";
import { Request, Response } from "express";
import { Name } from "../../Shared/Models/Name";
import UserRepository from "../Repository/UserRepository";
import { USERS_REPOSITORY } from "../../Shared/Infraestructure/dependency-names";
import { AuthService } from "../Services/AuthService";
import { DeleteUserService } from "../Services/DeleteUserService";
import { Uuid } from "../../Shared/Models/Uuid";

@injectable()
export class DeleteUserController implements HttpController {
    constructor(
        private httpService: HttpService,
        @inject(USERS_REPOSITORY) private userRepository: UserRepository,
    ) {}

    async execute(request: Request, response: Response): Promise<void> {
        try {
            const email = new Name(request.body.email);
            const user_id = new Uuid(request.body.id);

            const deleteUserService = new DeleteUserService(this.userRepository);
            const authService = new AuthService(this.userRepository);

            const bearerToken = request.headers['authorization'];
            if (!bearerToken) {
                this.httpService.unauthorized(response, 'Token no proporcionado');
                return;
            }

            try {
                await authService.verifyToken(email, bearerToken);
            } catch (error: any) {
                this.httpService.unauthorized(response, error.message);
                return;
            }

            try {
                await deleteUserService.execute(user_id);
                this.httpService.ok(response, "Usuario eliminado");
            } catch (error: any) {
                this.httpService.badRequest(response, error.message);
            }
        } catch (error: any) {
            console.error(error.message);
            this.httpService.badRequest(response, 'Error al eliminar el usuario.');
        }
    }
}
