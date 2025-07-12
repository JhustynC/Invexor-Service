import { CreateUserDto } from "../dtos/user/create-user.dto";
import { UpdateUserDto } from "../dtos/user/update-user.dto";
import { UserEntity } from "../entities/user.entity";

//? Rules
export abstract class AbsUserRepository {
    abstract saveUser(item: CreateUserDto): Promise<UserEntity>;
    abstract getUserById(id: string): Promise<UserEntity | undefined>;
    abstract getAllUsers(): Promise<UserEntity[]>;
    abstract updateUser(item: UpdateUserDto): Promise<UserEntity | undefined>;
    abstract deleteUser(id: string): Promise<UserEntity>;
}