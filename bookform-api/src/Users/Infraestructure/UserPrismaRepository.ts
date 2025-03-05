import { inject, injectable } from "tsyringe";
import { LogService } from "../../Shared/Infraestructure/Services/LogService";
import UserRepository from "../Repository/UserRepository";
import { User } from "../Model/User";
import { Uuid } from "../../Shared/Models/Uuid";
import { prisma } from "../../Shared/Prisma/prisma";
import { Name } from "../../Shared/Models/Name";
import { NameOptional } from "../../Shared/Models/NameOptional";

@injectable()
export default class UserPrismaRepository implements UserRepository {

    constructor(
        private logService: LogService,
    ) {}

    async saveUser(user: User): Promise<void>{
        try{
            await prisma.users.upsert({
                where: { id: user.id.value  },
                update: {
                    name: user.name.value,
                    email: user.email.value,
                    password: user.password.value,
                },
                create: {
                    id: user.id.value,
                    name: user.name.value,
                    email: user.email.value,
                    password: user.password.value,
                    token: user.token.value,
                }
            })}
            catch(error){
                throw new Error('El email ya existe.');
            }
    };
    async getUsers(name: NameOptional, email: NameOptional): Promise<User[]> {
        const users = await prisma.users.findMany({
            where: {
                AND: [
                    name.value ? {
                        OR: [
                            { name: { startsWith: name.value } },
                            { name: { endsWith: name.value } },
                        ],
                    } : {},
                ]
            }
        });
        return users.map(user => this.createUser(user));
    };
    async getUserById(id: Uuid): Promise<User| null> {
        const user = await prisma.users.findUnique({
            where: {
                id: id.value,
            }
        });
        return user ? this.createUser(user) : null;
    };
    async getUserByEmail(email: Name): Promise<User|null> {
        const user = await prisma.users.findUnique({
            where: {
                email: email.value,
            }
        });
        return user ? this.createUser(user) : null;
    };
    async removeUser(id: Uuid): Promise<void> {
        await prisma.users.delete({
            where: {
                id: id.value,
            }
        });
    }
    async saveAccessToken(id: Uuid, token: Uuid): Promise<void> {
        await prisma.users.update({
            where: {
                id: id.value,
                },
                data: {
                    token: token.value,
            }})
        };
    
   private createUser(data: any): User {
    const id = new Uuid(data.id);
    const name = new Name(data.name);
    const email = new Name(data.email);
    const password = new Name(data.password);
    const token = new Uuid(data.token);

    return new User(id, name, email, password, token); 
   }

    

}