import { AbsUserDatasource } from "../../domain/datasources/user.datasource";
import { CreateUserDto } from "../../domain/dtos/user/create-user.dto";
import { UpdateUserDto } from "../../domain/dtos/user/update-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { prisma } from "../../config/data/postgres/postgres.config";


export class PostgresUserDatasourceImp implements AbsUserDatasource{
    async saveUser(user: CreateUserDto): Promise<UserEntity> {
        const newUser = await prisma.user.create({
            data: {
                user_id: user.user_id,
                username: user.username,
                email: user.email,
                password: user.password,
                user_role_ids: user.user_role_ids
            }
        })

        return UserEntity.fromObject(newUser)
        //throw new Error("Method not implemented.");
    }
    
    async getByEmail(email: string): Promise<UserEntity | undefined> {
        const user = await prisma.user.findUnique({
            where: { email: email }
        });
        if(!user) return undefined
        return UserEntity.fromObject(user);
        //throw new Error("Method not implemented.");
    }
    async getAll(): Promise<UserEntity[]> {
        const users = await prisma.user.findMany();
        return users.map((user) => UserEntity.fromObject(user))
        //throw new Error("Method not implemented.");
    }
    async updateUser(user: UpdateUserDto): Promise<UserEntity | undefined> {
        //const currentEmail = user.email
        //const neew
        const updateData: any = {};
        if (user.username) updateData.username = user.username;
        if (user.email) updateData.email = user.email;
        if (user.password) updateData.password = user.password;
        if (user.user_role_ids) updateData.user_role_ids = user.user_role_ids

        const updateUser = await prisma.user.update({
            where: {user_id: user.user_id},
            data: updateData
        })

        if (!updateUser) return undefined;
        return UserEntity.fromObject(updateUser)

        //throw new Error("Method not implemented.");
    }

    async deleteUser(user_id: string): Promise<UserEntity> {
        const deleteUser = await prisma.user.delete({
            where: {user_id: user_id}
        })
        if (!deleteUser) throw new Error("Something happened while attempting to delete data");
        return UserEntity.fromObject(deleteUser);
    }

    async disconnet(): Promise<void> {
        await prisma.$disconnect();
    }
}