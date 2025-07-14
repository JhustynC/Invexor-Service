import { AbsUserRoleDatasource } from "../../domain/datasources/userRol.datasource";
import { CreateUserRolDto } from "../../domain/dtos/userRol/create-userRol.dto";
import { UserRolEntity } from "../../domain/entities/userRol.entity";
import { prisma } from "../../config/data/postgres/postgres.config";

export class PostgresUserRolDatasourceImp implements AbsUserRoleDatasource{
    async saveUserRole(userRole: CreateUserRolDto): Promise<UserRolEntity> {
        const newUserRole = await prisma.userRol.create({
            data:{
                userRol_id:userRole.userRol_id,
                rolname:userRole.rolname,
            }
        })

        return UserRolEntity.fromObject(newUserRole)
    }
    
    async getById(id: string): Promise<UserRolEntity | undefined> {
        const userRol = await prisma.userRol.findUnique({
            where:{userRol_id: id}
        })
        if(!userRol) return undefined
        return UserRolEntity.fromObject(userRol)
    }
    
    async getAll(): Promise<UserRolEntity[]> {
        const userRols = await prisma.user.findMany();
        return userRols.map((userRol) => UserRolEntity.fromObject(userRol))
    }
    
    async deleteUserRol(id: string): Promise<UserRolEntity> {
        const deleteUserRol = await prisma.userRol.delete({
            where: {userRol_id: id}
        })
        if (!deleteUserRol) throw new Error("Something happened while attempting to delete data");
        return UserRolEntity.fromObject(deleteUserRol)
    }
    
    async disconnet(): Promise<void> {
        await prisma.$disconnect();
    }

}