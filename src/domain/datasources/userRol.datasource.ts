import { CreateUserRolDto } from "../dtos/userRol/create-userRol.dto";
import { UserRolEntity } from "../entities/userRol.entity";

//? Rules
export abstract class AbsUserRoleDatasource {
    abstract saveUserRole(userRole: CreateUserRolDto): Promise<UserRolEntity>;
    abstract getById(id: string): Promise<UserRolEntity | undefined>;
    abstract getAll(): Promise<UserRolEntity[]>;
    //abstract updateUserRole(user: UpdateUserDto): Promise<UserEntity | undefined>;
    abstract deleteUserRol(id: string): Promise<UserRolEntity>;
}