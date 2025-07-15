import { AbsUserDatasource } from "../../domain/datasources/user.datasource";
import { CreateUserDto } from "../../domain/dtos/user/create-user.dto";
import { UpdateUserDto } from "../../domain/dtos/user/update-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { prisma } from "../../config/data/postgres/postgres.config";


export class PostgresUserDatasourceImp implements AbsUserDatasource{
    async getById(id: string): Promise<UserEntity | undefined> {
        const user = await prisma.user.findUnique({
            where: { id_user: id },
            include: {
                user_user_roles:true
            }
        });
        if(!user) return undefined
        return UserEntity.fromObject(user);
    }
    async saveUser(user: CreateUserDto): Promise<UserEntity> {
        const newUser = await prisma.user.create({
            data: {
                id_user: user.id_user,
                name_user: user.name_user,
                email: user.email,
                password: user.password,
                id_entity: 1
                //user_role_ids: user.user_role_ids
            }
        });

        await prisma.userUserRol.createMany({
            data: user.user_role_ids.map((roleId) =>({
                id_user: newUser.id_user,
                id_user_rol: roleId,
            }))
        })

        return UserEntity.fromObject({
            ...newUser,
            user_role_ids: user.user_role_ids, // si lo necesitas en la entidad
        });

        return UserEntity.fromObject(newUser)
        //throw new Error("Method not implemented.");
    }
    async getAll(): Promise<UserEntity[]> {
        const users = await prisma.user.findMany({
            include: {
                user_user_roles:true
            }
        });

        
        return users.map((user) => UserEntity.fromObject(user))
        //throw new Error("Method not implemented.");
    }
    async updateUser(user: UpdateUserDto): Promise<UserEntity | undefined> {
        //const currentEmail = user.email
        //const neew
        const updateData: any = {};
        if (user.name_user) updateData.name_user = user.name_user;
        if (user.email) updateData.email = user.email;
        if (user.password) updateData.password = user.password;
        if (user.user_role_ids) updateData.user_role_ids = user.user_role_ids

        const updateUser = await prisma.user.update({
            where: {id_user: user.id_user},
            data: updateData
        })

        if (!updateUser) return undefined;
        return UserEntity.fromObject(updateUser)

        //throw new Error("Method not implemented.");
    }

    async deleteUser(user_id: string): Promise<UserEntity> {
        const deleteUser = await prisma.user.delete({
            where: {id_user: user_id}
        })
        if (!deleteUser) throw new Error("Something happened while attempting to delete data");
        return UserEntity.fromObject(deleteUser);
    }

    async disconnet(): Promise<void> {
        await prisma.$disconnect();
    }
}