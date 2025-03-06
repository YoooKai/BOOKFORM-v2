import { inject, injectable } from "tsyringe";
import { HttpController } from "../../Shared/Infraestructure/types";
import HttpService from "../../Shared/Infraestructure/Services/HttpService";
import { Request, Response } from "express";
import UserRepository from "../Repository/UserRepository";
import { USERS_REPOSITORY } from "../../Shared/Infraestructure/dependency-names";
import { Uuid } from "../../Shared/Models/Uuid";
import { GetUserService } from "../Services/GetUserService";


@injectable()
export class GetUserController implements HttpController {

    constructor(
        private httpService: HttpService,
        @inject(USERS_REPOSITORY) private userRepository: UserRepository,
    ) {}
    
    async execute(request: Request, response: Response): Promise<void> {
        try {
            const id = new Uuid(request.params.id);
            
            const getUserService = new GetUserService(this.userRepository);  
            const user = await getUserService.execute(id);
    
            this.httpService.ok(response, user ? user.getPrimitives() : null); 

        } catch (error: any) {
            
            this.httpService.badRequest(response, 'Usuario no encontrado.');

        }

        
    }

}
