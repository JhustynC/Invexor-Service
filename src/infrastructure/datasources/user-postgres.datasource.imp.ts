import { AbsUserDatasource } from "../../domain/datasources/user.datasource";
import { CreateUserDto } from "../../domain/dtos/user/create-user.dto";
import { UpdateUserDto } from "../../domain/dtos/user/update-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { prisma } from "../../config/data/postgres/postgres.config";


export class PostgresUserDatasourceImp implements AbsUserDatasource{
    async getById(id: string): Promise<UserEntity | undefined> {
        const user = await prisma.user.findUnique({
            where: { user_id: id },
            include: {
                user_roles: true
            }
        });
        if(!user) return undefined
        return UserEntity.fromObject(user);
    }
    async saveUser(user: CreateUserDto): Promise<UserEntity> {
        const newUser = await prisma.user.create({
            data: {
                user_id: user.user_id,
                username: user.username,
                email: user.email,
                password: user.password,
                id_entity: user.id_entity,
                //user_roles: user.user_roles 
                //user_roles: user.user_roles
            }
        })

        await prisma.userUserRole.createMany({
            data: user.user_roles.map((roleId) =>({
                user_id: newUser.user_id,
                id_user_rol: roleId,
            }))
        })

        console.log(user.user_roles)
        return UserEntity.fromObject({
            ...newUser,
            user_roles:user.user_roles,
        })

        ///return UserEntity.fromObject(newUser)
        //throw new Error("Method not implemented.");
    }
    async getAll(): Promise<UserEntity[]> {
        const users = await prisma.user.findMany({
            include:{
                user_roles:true
            }
        });
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
        //if (user.user_roles) updateData.user_roles = user.user_roles

        const updateUser = await prisma.user.update({
            where: {user_id: user.user_id},
            data: updateData
        })

        // Si vienen nuevos roles, los actualizamos en la tabla intermedia
       /* if (user.user_roles && user.user_roles.length > 0) {
            // 🔥 1. Borramos relaciones anteriores
            
            await prisma.userUserRole.deleteMany({
                where: { user_id: user.user_id }
            });

            // ✅ 2. Creamos nuevas relaciones
            await prisma.userUserRole.createMany({
                data: user.user_roles.map((roleId) => ({
                    user_id: user.user_id,
                    id_user_rol: roleId
                }))
            });
        }*/
       // 1. Verificamos si user_roles fue enviado (aunque esté vacío)
        if (user.user_roles) {
        // 🔥 Borramos relaciones anteriores
        await prisma.userUserRole.deleteMany({
            where: { user_id: user.user_id }
        });

        // ✅ Creamos nuevas relaciones SOLO si hay roles
        if (user.user_roles.length > 0) {
            await prisma.userUserRole.createMany({
            data: user.user_roles.map((roleId) => ({
                user_id: user.user_id,
                id_user_rol: roleId
            }))
            });
        }
        }


        // Ahora incluimos los roles actualizados
        const userWithRoles = await prisma.user.findUnique({
            where: { user_id: user.user_id },
            include: { user_roles: true }
        });

        if (!userWithRoles) return undefined;

        return UserEntity.fromObject(userWithRoles);
        //if (!updateUser) return undefined;
        //return UserEntity.fromObject(updateUser)

        //throw new Error("Method not implemented.");
    }

    async deleteUser(user_id: string): Promise<UserEntity> {
        const deleteUser = await prisma.user.findUnique({
            where: {user_id: user_id},
            include:{user_roles:true}
        })

        if (!deleteUser) {
            throw new Error("User not found.");
        }

        await prisma.userUserRole.deleteMany({
            where:{user_id: user_id}
        });

        await prisma.user.delete({
            where: {user_id: user_id}
        })

        if (!deleteUser) throw new Error("Something happened while attempting to delete data");
        return UserEntity.fromObject(deleteUser);
    }

    async disconnet(): Promise<void> {
        await prisma.$disconnect();
    }
}