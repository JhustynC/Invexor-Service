import { AbsItemDatasource } from "../../domain/datasources/item.datasource";
import { CreateItemDto } from "../../domain/dtos/item/create-item.dto";
import { UpdateItemDto } from "../../domain/dtos/item/update-item.dto";
import { ItemEntity } from "../../domain/entities/item.entity";
import { prisma } from "../../config/data/postgres/postgres.config"


export class PostgresItemDatasourceImp implements AbsItemDatasource{
    async saveItem(item: CreateItemDto): Promise<ItemEntity> {
        const newItem = await prisma.item.create({
            data: {
                item: item.item_id,
                description: item.description,
                item_type_ids: item.item_type_ids,
                itemname: item.itemname,
                provider: item.provider
            }
        })

        return ItemEntity.fromObject(newItem);
    }
    
    async getById(id: string): Promise<ItemEntity | undefined> {
        const item = await prisma.item.findUnique({
            where: {item_id: id}
        })
        if(!item) return undefined
        return ItemEntity.fromObject(item)
    }
    
    async getAll(): Promise<ItemEntity[]> {
        const items = await prisma.item.findMany();
        return items.map((item) => ItemEntity.fromObject(item))
    }
    
    async updateItem(item: UpdateItemDto): Promise<ItemEntity | undefined> {
        const updateData: any = {};
        if (item.description) updateData.description = item.description;
        if (item.item_type_ids) updateData.description = item.item_type_ids;
        if (item.itemname) updateData.itemname = item.itemname;
        if (item.provider) updateData.provider = item.provider;
        //if (item.)
        const updateItem = await prisma.item.update({
            where: {item_id: item.item_id},
            data: updateData
        })
        
        if (!updateItem) return undefined
        return ItemEntity.fromObject(updateItem)
    }
    
    async deleteItem(id: string): Promise<ItemEntity> {
        const deleteItem = await prisma.item.delete({
            where: {item_id: id}
        })
        if (!deleteItem) throw new Error("Something happened while attempting to delete data");
        return ItemEntity.fromObject(deleteItem)
    }

    async disconnet(): Promise<void> {
        await prisma.$disconnect();
    }

}