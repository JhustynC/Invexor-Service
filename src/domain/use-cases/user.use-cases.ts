import { CreateUserDto } from "../dtos/user/create-user.dto";
import { UpdateUserDto } from "../dtos/user/update-user.dto";
import { UserEntity } from "../entities/user.entity";
import { AbsUserRepository } from "../repositories/user.repository";

export class UserUseCases {
    constructor(public readonly repository: AbsUserRepository){}

    async createUser(dto: CreateUserDto): Promise<UserEntity>{
        return await this.repository.saveUser(dto);
    }

    async deleteUser(id: string): Promise<UserEntity>{
        return await this.repository.deleteUser(id);
    }

    async getUserById(id: string): Promise<UserEntity | undefined>{
        return await this.repository.getUserById(id);
    }

    async getAllUsers(): Promise<UserEntity[]>{
        return await this.repository.getAllUsers();
    }

    async updateUser(dto: UpdateUserDto): Promise<UserEntity | undefined>{
        return await this.repository.updateUser(dto);
    }
}