import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // Limpiar datos existentes para evitar duplicados
  await prisma.transaction.deleteMany({});
  await prisma.entity.deleteMany({});
  await prisma.entityType.deleteMany({});
  console.log('Cleaned existing data...');

  // 1. Crear EntityTypes
  const entityTypeUser = await prisma.entityType.create({
    data: { name_entity_type: 'User' },
  });
  const entityTypeCompany = await prisma.entityType.create({
    data: { name_entity_type: 'Company' },
  });
  console.log('Created entity types...');

  // 2. Crear Entities
  const entity1 = await prisma.entity.create({ data: { id_entity_type: entityTypeUser.id_entity_type } });
  const entity2 = await prisma.entity.create({ data: { id_entity_type: entityTypeUser.id_entity_type } });
  const entity3 = await prisma.entity.create({ data: { id_entity_type: entityTypeCompany.id_entity_type } });
  const entity4 = await prisma.entity.create({ data: { id_entity_type: entityTypeCompany.id_entity_type } });
  const entity5 = await prisma.entity.create({ data: { id_entity_type: entityTypeUser.id_entity_type } });
  const entity6 = await prisma.entity.create({ data: { id_entity_type: entityTypeCompany.id_entity_type } });
  console.log('Created 6 entities...');

  // 3. Crear Transactions
  await prisma.transaction.createMany({
    data: [
      // 2023 Transactions (5)
      { old_owner_id: entity1.id_entity, new_owner_id: entity4.id_entity, amount: 75.00, transaction_date: new Date('2023-04-12T10:00:00Z') },
      { old_owner_id: entity2.id_entity, new_owner_id: entity5.id_entity, amount: 150.50, transaction_date: new Date('2023-06-22T11:30:00Z') },
      { old_owner_id: entity3.id_entity, new_owner_id: entity6.id_entity, amount: 300.00, transaction_date: new Date('2023-09-01T14:00:00Z') },
      { old_owner_id: entity4.id_entity, new_owner_id: entity1.id_entity, amount: 25.25, transaction_date: new Date('2023-11-18T16:45:00Z') },
      { old_owner_id: entity5.id_entity, new_owner_id: entity2.id_entity, amount: 500.75, transaction_date: new Date('2023-12-25T18:00:00Z') },

      // 2024 Transactions (10)
      { old_owner_id: entity1.id_entity, new_owner_id: entity2.id_entity, amount: 100.50, transaction_date: new Date('2024-01-15T10:00:00Z') },
      { old_owner_id: entity2.id_entity, new_owner_id: entity3.id_entity, amount: 250.00, transaction_date: new Date('2024-01-20T11:00:00Z') },
      { old_owner_id: entity3.id_entity, new_owner_id: entity1.id_entity, amount: 50.25, transaction_date: new Date('2024-03-10T12:00:00Z') },
      { old_owner_id: entity4.id_entity, new_owner_id: entity5.id_entity, amount: 80.00, transaction_date: new Date('2024-04-05T09:00:00Z') },
      { old_owner_id: entity5.id_entity, new_owner_id: entity6.id_entity, amount: 120.00, transaction_date: new Date('2024-06-15T13:20:00Z') },
      { old_owner_id: entity6.id_entity, new_owner_id: entity1.id_entity, amount: 99.99, transaction_date: new Date('2024-07-21T15:10:00Z') },
      { old_owner_id: entity1.id_entity, new_owner_id: entity3.id_entity, amount: 350.00, transaction_date: new Date('2024-08-30T10:30:00Z') },
      { old_owner_id: entity2.id_entity, new_owner_id: entity4.id_entity, amount: 475.50, transaction_date: new Date('2024-10-11T11:45:00Z') },
      { old_owner_id: entity3.id_entity, new_owner_id: entity5.id_entity, amount: 600.00, transaction_date: new Date('2024-11-02T18:00:00Z') },
      { old_owner_id: entity4.id_entity, new_owner_id: entity6.id_entity, amount: 200.00, transaction_date: new Date('2024-12-24T20:00:00Z') },
      
      // 2025 Transactions (12)
      { old_owner_id: entity1.id_entity, new_owner_id: entity3.id_entity, amount: 1200.00, transaction_date: new Date('2025-02-05T14:00:00Z') },
      { old_owner_id: entity2.id_entity, new_owner_id: entity1.id_entity, amount: 300.75, transaction_date: new Date('2025-02-15T15:00:00Z') },
      { old_owner_id: entity3.id_entity, new_owner_id: entity2.id_entity, amount: 450.00, transaction_date: new Date('2025-05-25T16:00:00Z') },
      { old_owner_id: entity1.id_entity, new_owner_id: entity2.id_entity, amount: 75.00, transaction_date: new Date('2025-05-30T17:00:00Z') },
      { old_owner_id: entity4.id_entity, new_owner_id: entity1.id_entity, amount: 1500.00, transaction_date: new Date('2025-06-10T09:30:00Z') },
      { old_owner_id: entity5.id_entity, new_owner_id: entity3.id_entity, amount: 25.50, transaction_date: new Date('2025-07-01T11:00:00Z') },
      { old_owner_id: entity6.id_entity, new_owner_id: entity4.id_entity, amount: 850.00, transaction_date: new Date('2025-08-19T14:45:00Z') },
      { old_owner_id: entity1.id_entity, new_owner_id: entity5.id_entity, amount: 95.20, transaction_date: new Date('2025-09-12T16:00:00Z') },
      { old_owner_id: entity2.id_entity, new_owner_id: entity6.id_entity, amount: 10.00, transaction_date: new Date('2025-10-05T18:30:00Z') },
      { old_owner_id: entity3.id_entity, new_owner_id: entity1.id_entity, amount: 2000.00, transaction_date: new Date('2025-11-28T21:00:00Z') },
      { old_owner_id: entity4.id_entity, new_owner_id: entity2.id_entity, amount: 333.33, transaction_date: new Date('2025-12-15T12:00:00Z') },
      { old_owner_id: entity5.id_entity, new_owner_id: entity6.id_entity, amount: 444.44, transaction_date: new Date('2025-12-31T23:59:59Z') },
    ],
  });
  console.log('Created transactions...');

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
