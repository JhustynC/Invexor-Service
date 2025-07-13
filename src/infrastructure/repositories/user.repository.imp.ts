import { AbsUserDatasource } from "../../domain/datasources/user.datasource";
import { CreateUserDto } from "../../domain/dtos/user/create-user.dto";
import { UpdateUserDto } from "../../domain/dtos/user/update-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { AbsUserRepository } from "../../domain/repositories/user.repository";

export class UserRepositoryImp implements AbsUserRepository{

    constructor(private readonly datasource: AbsUserDatasource){}
    getUserById(id: string): Promise<UserEntity | undefined> {
        return this.datasource.getById(id);
    }
    getAllUsers(): Promise<UserEntity[]> {
        return this.datasource.getAll();
    }
    saveUser(user: CreateUserDto): Promise<UserEntity> {
        return this.datasource.saveUser(user);
    }
    updateUser(user: UpdateUserDto): Promise<UserEntity | undefined> {
        return this.datasource.updateUser(user);
    }
    deleteUser(email: string): Promise<UserEntity> {
        return this.datasource.deleteUser(email);
    }
}