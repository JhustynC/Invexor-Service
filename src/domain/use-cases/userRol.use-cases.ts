import { UpdateUserDto } from "../dtos/user/update-user.dto";
import { CreateUserRolDto } from "../dtos/userRol/create-userRol.dto";
import { UserRolEntity } from "../entities/userRol.entity";
import { AbsUserRolRepository } from "../repositories/userRol.repository";

export class UserRolUseCases {
    constructor(public readonly repository: AbsUserRolRepository){}

    async createUserRol(dto: CreateUserRolDto): Promise<UserRolEntity>{
        return await this.repository.saveUserRol(dto);
    }

    async deleteUserRol(id: number): Promise<UserRolEntity>{
        return await this.repository.deleteUserRol(id);
    }

    async getUserRolById(id: number): Promise<UserRolEntity | undefined>{
        return await this.repository.getUserRolById(id);
    }

    async getAllUserRols(): Promise<UserRolEntity[]>{
        return await this.repository.getAllUserRols();
    }

    /*async updateUserRol(dto: UpdateUserDto): Promise<UserRolEntity | undefined>{
        return await this.repository.update(dto);
    }*/
}