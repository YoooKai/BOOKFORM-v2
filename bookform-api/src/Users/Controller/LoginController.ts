
import { injectable, inject } from "tsyringe";
import { HttpController } from "../../Shared/Infraestructure/types";
import HttpService from "../../Shared/Infraestructure/Services/HttpService";
import UserRepository from "../Repository/UserRepository";
import { USERS_REPOSITORY } from "../../Shared/Infraestructure/dependency-names";
import { AuthService } from "../Services/AuthService";
import { Request, Response } from "express";
import { Name } from "../../Shared/Models/Name";


@injectable()
export class LoginController implements HttpController{
    constructor(
        private httpService: HttpService,
        @inject(USERS_REPOSITORY) private userRepository: UserRepository,
        private authService: AuthService
    ){}

    async execute(request: Request, response: Response): Promise<void> {
        const email = new Name(request.body.email);
        const password = new Name(request.body.password);
        try {
            const checkPass = await this.authService.checkPassword(email, password);
            if (checkPass){
                const token = await this.authService.login(email, password);
                this.httpService.send(200, response, token);
            }
        } catch (error: any) {
            this.httpService.unauthorized(response, error);
        }
    }
}
