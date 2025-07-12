import { CreateUserRolDto } from "../dtos/userRol/create-userRol.dto";
import { UserRolEntity } from "../entities/userRol.entity";

//? Rules
export abstract class AbsUserRoleDatasource {
    abstract saveUserRole(userRole: CreateUserRolDto): Promise<UserRolEntity>;
    abstract getByEmail(email: string): Promise<UserRolEntity | undefined>;
    abstract getAll(): Promise<UserRolEntity[]>;
    //abstract updateUserRole(user: UpdateUserDto): Promise<UserEntity | undefined>;
    abstract deleteUserRol(email: string): Promise<UserRolEntity>;
}