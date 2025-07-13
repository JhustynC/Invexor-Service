import { AbsItemTypeDatasource } from "../../domain/datasources/itemType.datasource";
import { CreateItemTypeDto } from "../../domain/dtos/itemType/create-itemType.dto";
import { ItemTypeEntity } from "../../domain/entities/itemType.entity";
import { prisma } from "../../config/data/postgres/postgres.config";

export class PostgresItemtype implements AbsItemTypeDatasource{
    async saveItemType(itemType: CreateItemTypeDto): Promise<ItemTypeEntity> {
        const newItemType = await prisma.itemType.create({
            data:{
                itemType_id: itemType.itemType_id,
                name: itemType.name
            }
        })
        return ItemTypeEntity.fromObject(newItemType)
    }
    async getById(id: string): Promise<ItemTypeEntity | undefined> {
        const itemType = await prisma.itemType.findUnique({
            where: {itemType_id: id}
        })
        if(!itemType) return undefined
        return ItemTypeEntity.fromObject(itemType)
    }
    async getAll(): Promise<ItemTypeEntity[]> {
        const itemTypes = await prisma.itemType.findMany();
        return itemTypes.map((itemType) => ItemTypeEntity.fromObject(itemType))
    }
    async deleteItemType(id: string): Promise<ItemTypeEntity> {
        const deleteItemType = await prisma.itemType.delete({
            where: {itemType_id: id}
        })
        if (!deleteItemType) throw new Error("Something happened while attempting to delete data");
        return ItemTypeEntity.fromObject(deleteItemType)
    }
    async disconnet(): Promise<void> {
        await prisma.$disconnect();
    }
}