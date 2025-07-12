import { CreateUserRolDto } from "../../domain/dtos/userRol/create-userRol.dto";
import { UserRolEntity } from "../../domain/entities/userRol.entity";
import { AbsUserRolRepository } from "../../domain/repositories/userRol.repository";

export class UserRolRepositoryImp implements AbsUserRolRepository{

    constructor(private readonly datasource: AbsUserRolRepository){}
    saveUserRol(userRol: CreateUserRolDto): Promise<UserRolEntity> {
        return this.datasource.saveUserRol(userRol);
    }
    getUserRolById(id: string): Promise<UserRolEntity | undefined> {
        return this.datasource.getUserRolById(id);
    }
    getAllUserRols(): Promise<UserRolEntity[]> {
        return this.datasource.getAllUserRols();
    }
    deleteUserRol(id: string): Promise<UserRolEntity> {
        return this.datasource.deleteUserRol(id);
    }
}