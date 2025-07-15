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
    const updateData: any = {};
    console.log("nombre_usuario")
    console.log(user.name_user)
    if (user.name_user) updateData.name_user = user.name_user;
    if (user.email) updateData.email = user.email;
    if (user.password) updateData.password = user.password;

    // Primero actualizamos los campos básicos del usuario
    const updatedUser = await prisma.user.update({
        where: { id_user: user.id_user },
        data: updateData
    });

    // Si vienen nuevos roles, los actualizamos en la tabla intermedia
    if (user.user_role_ids && user.user_role_ids.length > 0) {
        // 🔥 1. Borramos relaciones anteriores
        await prisma.userUserRol.deleteMany({
            where: { id_user: user.id_user }
        });

        // ✅ 2. Creamos nuevas relaciones
        await prisma.userUserRol.createMany({
            data: user.user_role_ids.map((roleId) => ({
                id_user: user.id_user,
                id_user_rol: roleId
            }))
        });
    }

    // Ahora incluimos los roles actualizados
    const userWithRoles = await prisma.user.findUnique({
        where: { id_user: user.id_user },
        include: { user_user_roles: true }
    });

    if (!userWithRoles) return undefined;

    return UserEntity.fromObject(userWithRoles);
}


    async deleteUser(id_user: string): Promise<UserEntity> {

        // Obtener el usuario y sus roles antes de eliminar
        const userToDelete = await prisma.user.findUnique({
            where: { id_user },
            include: { user_user_roles: true }
        });

        if (!userToDelete) {
            throw new Error("User not found");
        }

        // Eliminar relaciones
        await prisma.userUserRol.deleteMany({
            where: { id_user }
        });

        // Eliminar usuario
        await prisma.user.delete({
            where: { id_user }
        });

        // Retornar la entidad creada desde los datos obtenidos previamente
        return UserEntity.fromObject(userToDelete);
    }

    async disconnet(): Promise<void> {
        await prisma.$disconnect();
    }
}