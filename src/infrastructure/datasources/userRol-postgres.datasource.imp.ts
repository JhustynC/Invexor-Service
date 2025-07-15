import { AbsUserRoleDatasource } from "../../domain/datasources/userRol.datasource";
import { CreateUserRolDto } from "../../domain/dtos/userRol/create-userRol.dto";
import { UserRolEntity } from "../../domain/entities/userRol.entity";
import { prisma } from "../../config/data/postgres/postgres.config";

export class PostgresUserRolDatasourceImp implements AbsUserRoleDatasource{
    async saveUserRol(userRole: CreateUserRolDto): Promise<UserRolEntity> {
        const newUserRole = await prisma.userRol.create({
            data:{
                id_user_rol:userRole.id_user_rol,
               name_user_rol:userRole.name_user_rol,
            }
        })

        return UserRolEntity.fromObject(newUserRole)
    }
    
    async getUserRolById(id: number): Promise<UserRolEntity | undefined> {
        const userRol = await prisma.userRol.findUnique({
            where:{id_user_rol: id}
        })
        if(!userRol) return undefined
        return UserRolEntity.fromObject(userRol)
    }
    
    async getAllUserRols(): Promise<UserRolEntity[]> {
        const userRols = await prisma.userRol.findMany();
        return userRols.map((userRol) => UserRolEntity.fromObject(userRol))
    }
    
    async deleteUserRol(id: number): Promise<UserRolEntity> {
        const deleteUserRol = await prisma.userRol.delete({
            where: {id_user_rol: id}
        })
        if (!deleteUserRol) throw new Error("Something happened while attempting to delete data");
        return UserRolEntity.fromObject(deleteUserRol)
    }
    
    async disconnet(): Promise<void> {
        await prisma.$disconnect();
    }

}