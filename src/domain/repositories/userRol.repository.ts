import { CreateUserRolDto } from "../dtos/userRol/create-userRol.dto";
import { UserRolEntity } from "../entities/userRol.entity";

//? Rules
export abstract class AbsUserRolRepository {
    abstract saveUserRol(userRol: CreateUserRolDto): Promise<UserRolEntity>;
    abstract getUserRolById(id: number): Promise<UserRolEntity | undefined>;
    abstract getAllUserRols(): Promise<UserRolEntity[]>;
    //abstract updateUserRol(item: UpdateUserRolDto): Promise<UserRolEntity | undefined>;
    abstract deleteUserRol(id: number): Promise<UserRolEntity>;
}