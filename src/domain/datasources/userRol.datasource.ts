import { CreateUserRolDto } from "../dtos/userRol/create-userRol.dto";
import { UserRolEntity } from "../entities/userRol.entity";

//? Rules
export abstract class AbsUserRoleDatasource {
    abstract saveUserRol(userRole: CreateUserRolDto): Promise<UserRolEntity>;
    abstract getUserRolById(id: number): Promise<UserRolEntity | undefined>;
    abstract getAllUserRols(): Promise<UserRolEntity[]>;
    //abstract updateUserRole(user: UpdateUserDto): Promise<UserEntity | undefined>;
    abstract deleteUserRol(id: number): Promise<UserRolEntity>;
}