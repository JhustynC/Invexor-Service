import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // Limpiar datos existentes para evitar duplicados (en orden correcto por dependencias)
  await prisma.userUserRole.deleteMany({});
  await prisma.transactionEntity.deleteMany({});
  await prisma.entityOwnership.deleteMany({});
  await prisma.transaction.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.item.deleteMany({});
  await prisma.resource.deleteMany({});
  await prisma.area.deleteMany({});
  await prisma.branch.deleteMany({});
  await prisma.itemType.deleteMany({});
  await prisma.userRole.deleteMany({});
  await prisma.entity.deleteMany({});
  console.log('Cleaned existing data...');

  // 1. Crear UserRoles
  const adminRole = await prisma.userRole.create({
    data: { name_user_rol: 'Admin' },
  });
  const managerRole = await prisma.userRole.create({
    data: { name_user_rol: 'Manager' },
  });
  const employeeRole = await prisma.userRole.create({
    data: { name_user_rol: 'Employee' },
  });
  const viewerRole = await prisma.userRole.create({
    data: { name_user_rol: 'Viewer' },
  });
  console.log('Created user roles...');

  // 2. Crear ItemTypes
  const equipmentType = await prisma.itemType.create({
    data: { name: 'Equipment' },
  });
  const softwareType = await prisma.itemType.create({
    data: { name: 'Software' },
  });
  const furnitureType = await prisma.itemType.create({
    data: { name: 'Furniture' },
  });
  const vehicleType = await prisma.itemType.create({
    data: { name: 'Vehicle' },
  });
  console.log('Created item types...');

  // 3. Crear Entities (más entidades para cubrir todos los casos)
  const userEntity1 = await prisma.entity.create({ data: { entity_type: 1 } });
  const userEntity2 = await prisma.entity.create({ data: { entity_type: 1 } });
  const userEntity3 = await prisma.entity.create({ data: { entity_type: 1 } });
  const userEntity4 = await prisma.entity.create({ data: { entity_type: 1 } });
  const branchEntity1 = await prisma.entity.create({ data: { entity_type: 2 } });
  const branchEntity2 = await prisma.entity.create({ data: { entity_type: 2 } });
  const areaEntity1 = await prisma.entity.create({ data: { entity_type: 3 } });
  const areaEntity2 = await prisma.entity.create({ data: { entity_type: 3 } });
  const areaEntity3 = await prisma.entity.create({ data: { entity_type: 3 } });
  const itemEntity1 = await prisma.entity.create({ data: { entity_type: 4 } });
  const itemEntity2 = await prisma.entity.create({ data: { entity_type: 4 } });
  const itemEntity3 = await prisma.entity.create({ data: { entity_type: 4 } });
  const itemEntity4 = await prisma.entity.create({ data: { entity_type: 4 } });
  const resourceEntity1 = await prisma.entity.create({ data: { entity_type: 5 } });
  const resourceEntity2 = await prisma.entity.create({ data: { entity_type: 5 } });
  const resourceEntity3 = await prisma.entity.create({ data: { entity_type: 5 } });
  console.log('Created 16 entities...');

  // 4. Crear Users
  const user1 = await prisma.user.create({
    data: {
      user_id: uuidv4(),
      username: 'admin_user',
      email: 'admin@invexor.com',
      password: '$2b$10$hashedpassword1', // En producción usar bcrypt
      id_entity: userEntity1.id_entity,
    },
  });
  const user2 = await prisma.user.create({
    data: {
      user_id: uuidv4(),
      username: 'manager_user',
      email: 'manager@invexor.com',
      password: '$2b$10$hashedpassword2',
      id_entity: userEntity2.id_entity,
    },
  });
  const user3 = await prisma.user.create({
    data: {
      user_id: uuidv4(),
      username: 'employee_user',
      email: 'employee@invexor.com',
      password: '$2b$10$hashedpassword3',
      id_entity: userEntity3.id_entity,
    },
  });
  const user4 = await prisma.user.create({
    data: {
      user_id: uuidv4(),
      username: 'viewer_user',
      email: 'viewer@invexor.com',
      password: '$2b$10$hashedpassword4',
      id_entity: userEntity4.id_entity,
    },
  });
  console.log('Created users...');

  // 5. Crear UserUserRoles
  await prisma.userUserRole.createMany({
    data: [
      { user_id: user1.user_id, id_user_rol: adminRole.id_user_rol },
      { user_id: user1.user_id, id_user_rol: managerRole.id_user_rol }, // Admin también puede ser manager
      { user_id: user2.user_id, id_user_rol: managerRole.id_user_rol },
      { user_id: user3.user_id, id_user_rol: employeeRole.id_user_rol },
      { user_id: user4.user_id, id_user_rol: viewerRole.id_user_rol },
    ],
  });
  console.log('Created user-role relationships...');

  // 6. Crear Branches
  const branch1 = await prisma.branch.create({
    data: {
      id_branch: uuidv4(),
      name_branch: 'Sucursal Central',
      city: 'Ciudad de México',
      phone: '+52-55-1234-5678',
      state: true,
      id_entity: branchEntity1.id_entity,
    },
  });
  const branch2 = await prisma.branch.create({
    data: {
      id_branch: uuidv4(),
      name_branch: 'Sucursal Norte',
      city: 'Monterrey',
      phone: '+52-81-9876-5432',
      state: true,
      id_entity: branchEntity2.id_entity,
    },
  });
  console.log('Created branches...');

  // 7. Crear Areas (con relaciones jerárquicas)
  // Primero crear el área raíz con un ID temporal
  const tempAreaId = uuidv4();
  const area1 = await prisma.area.create({
    data: {
      area_id: tempAreaId,
      areaname: 'Administración',
      pattern_area_id: tempAreaId, // Se referencia a sí misma
      branch_id: branch1.id_branch,
      phone: '+52-55-1234-5679',
      description: 'Área de administración general',
      active: true,
      id_entity: areaEntity1.id_entity,
    },
  });

  const area2 = await prisma.area.create({
    data: {
      area_id: uuidv4(),
      areaname: 'Recursos Humanos',
      pattern_area_id: area1.area_id, // Sub-área de Administración
      branch_id: branch1.id_branch,
      phone: '+52-55-1234-5680',
      description: 'Área de recursos humanos',
      active: true,
      id_entity: areaEntity2.id_entity,
    },
  });
  const area3 = await prisma.area.create({
    data: {
      area_id: uuidv4(),
      areaname: 'Tecnología',
      pattern_area_id: area1.area_id, // Sub-área de Administración
      branch_id: branch2.id_branch,
      phone: '+52-81-9876-5433',
      description: 'Área de tecnología e informática',
      active: true,
      id_entity: areaEntity3.id_entity,
    },
  });
  console.log('Created areas...');

  // 8. Crear Items
  const item1 = await prisma.item.create({
    data: {
      id_item: uuidv4(),
      name_item: 'Laptop Dell XPS 13',
      description: 'Laptop para desarrollo y trabajo de oficina',
      provider: 'Dell Technologies',
      id_item_type: equipmentType.id_item_type,
      id_entity: itemEntity1.id_entity,
    },
  });
  const item2 = await prisma.item.create({
    data: {
      id_item: uuidv4(),
      name_item: 'Licencia Microsoft Office',
      description: 'Suite de oficina completa',
      provider: 'Microsoft Corporation',
      id_item_type: softwareType.id_item_type,
      id_entity: itemEntity2.id_entity,
    },
  });
  const item3 = await prisma.item.create({
    data: {
      id_item: uuidv4(),
      name_item: 'Escritorio Ejecutivo',
      description: 'Escritorio de madera con cajones',
      provider: 'Muebles Modernos SA',
      id_item_type: furnitureType.id_item_type,
      id_entity: itemEntity3.id_entity,
    },
  });
  const item4 = await prisma.item.create({
    data: {
      id_item: uuidv4(),
      name_item: 'Vehículo Toyota Corolla',
      description: 'Automóvil para transporte corporativo',
      provider: 'Toyota Motor Company',
      id_item_type: vehicleType.id_item_type,
      id_entity: itemEntity4.id_entity,
    },
  });
  console.log('Created items...');

  // 9. Crear Resources
  const resource1 = await prisma.resource.create({
    data: {
      resource_id: uuidv4(),
      resourcename: 'Presupuesto Anual TI',
      measure: 'Pesos Mexicanos',
      currency: 'MXN',
      description: 'Presupuesto destinado para tecnología e informática',
      id_entity: resourceEntity1.id_entity,
    },
  });
  const resource2 = await prisma.resource.create({
    data: {
      resource_id: uuidv4(),
      resourcename: 'Horas de Capacitación',
      measure: 'Horas',
      currency: 'N/A',
      description: 'Horas disponibles para capacitación del personal',
      id_entity: resourceEntity2.id_entity,
    },
  });
  const resource3 = await prisma.resource.create({
    data: {
      resource_id: uuidv4(),
      resourcename: 'Espacio de Oficina',
      measure: 'Metros Cuadrados',
      currency: 'N/A',
      description: 'Espacio físico disponible para oficinas',
      id_entity: resourceEntity3.id_entity,
    },
  });
  console.log('Created resources...');

  // 10. Crear EntityOwnerships (relaciones de propiedad)
  await prisma.entityOwnership.createMany({
    data: [
      // Users own items
      { id_owner_entity: userEntity1.id_entity, id_owned_entity: itemEntity1.id_entity, amount: 1 },
      { id_owner_entity: userEntity2.id_entity, id_owned_entity: itemEntity2.id_entity, amount: 1 },
      { id_owner_entity: userEntity3.id_entity, id_owned_entity: itemEntity3.id_entity, amount: 1 },
      // Branches own resources
      { id_owner_entity: branchEntity1.id_entity, id_owned_entity: resourceEntity1.id_entity, amount: 1000000 }, // 1M pesos
      { id_owner_entity: branchEntity1.id_entity, id_owned_entity: resourceEntity2.id_entity, amount: 500 }, // 500 horas
      { id_owner_entity: branchEntity2.id_entity, id_owned_entity: resourceEntity3.id_entity, amount: 200 }, // 200 m2
      // Areas own items
      { id_owner_entity: areaEntity3.id_entity, id_owned_entity: itemEntity4.id_entity, amount: 1 },
    ],
  });
  console.log('Created entity ownerships...');

  // 11. Crear Transactions
  await prisma.transaction.createMany({
    data: [
      // 2023 Transactions (5)
      { old_owner_id: userEntity1.id_entity, new_owner_id: branchEntity1.id_entity, amount: 75.00, transaction_date: new Date('2023-04-12T10:00:00Z') },
      { old_owner_id: userEntity2.id_entity, new_owner_id: areaEntity1.id_entity, amount: 150.50, transaction_date: new Date('2023-06-22T11:30:00Z') },
      { old_owner_id: branchEntity1.id_entity, new_owner_id: branchEntity2.id_entity, amount: 300.00, transaction_date: new Date('2023-09-01T14:00:00Z') },
      { old_owner_id: branchEntity2.id_entity, new_owner_id: userEntity1.id_entity, amount: 25.25, transaction_date: new Date('2023-11-18T16:45:00Z') },
      { old_owner_id: areaEntity1.id_entity, new_owner_id: userEntity2.id_entity, amount: 500.75, transaction_date: new Date('2023-12-25T18:00:00Z') },

      // 2024 Transactions (10)
      { old_owner_id: userEntity1.id_entity, new_owner_id: userEntity2.id_entity, amount: 100.50, transaction_date: new Date('2024-01-15T10:00:00Z') },
      { old_owner_id: userEntity2.id_entity, new_owner_id: branchEntity1.id_entity, amount: 250.00, transaction_date: new Date('2024-01-20T11:00:00Z') },
      { old_owner_id: branchEntity1.id_entity, new_owner_id: userEntity1.id_entity, amount: 50.25, transaction_date: new Date('2024-03-10T12:00:00Z') },
      { old_owner_id: branchEntity2.id_entity, new_owner_id: areaEntity1.id_entity, amount: 80.00, transaction_date: new Date('2024-04-05T09:00:00Z') },
      { old_owner_id: areaEntity1.id_entity, new_owner_id: areaEntity2.id_entity, amount: 120.00, transaction_date: new Date('2024-06-15T13:20:00Z') },
      { old_owner_id: areaEntity2.id_entity, new_owner_id: userEntity1.id_entity, amount: 99.99, transaction_date: new Date('2024-07-21T15:10:00Z') },
      { old_owner_id: userEntity1.id_entity, new_owner_id: branchEntity1.id_entity, amount: 350.00, transaction_date: new Date('2024-08-30T10:30:00Z') },
      { old_owner_id: userEntity2.id_entity, new_owner_id: branchEntity2.id_entity, amount: 475.50, transaction_date: new Date('2024-10-11T11:45:00Z') },
      { old_owner_id: branchEntity1.id_entity, new_owner_id: areaEntity1.id_entity, amount: 600.00, transaction_date: new Date('2024-11-02T18:00:00Z') },
      { old_owner_id: branchEntity2.id_entity, new_owner_id: areaEntity2.id_entity, amount: 200.00, transaction_date: new Date('2024-12-24T20:00:00Z') },
      
      // 2025 Transactions (12)
      { old_owner_id: userEntity1.id_entity, new_owner_id: branchEntity1.id_entity, amount: 1200.00, transaction_date: new Date('2025-02-05T14:00:00Z') },
      { old_owner_id: userEntity2.id_entity, new_owner_id: userEntity1.id_entity, amount: 300.75, transaction_date: new Date('2025-02-15T15:00:00Z') },
      { old_owner_id: branchEntity1.id_entity, new_owner_id: userEntity2.id_entity, amount: 450.00, transaction_date: new Date('2025-05-25T16:00:00Z') },
      { old_owner_id: userEntity1.id_entity, new_owner_id: userEntity2.id_entity, amount: 75.00, transaction_date: new Date('2025-05-30T17:00:00Z') },
      { old_owner_id: branchEntity2.id_entity, new_owner_id: userEntity1.id_entity, amount: 1500.00, transaction_date: new Date('2025-06-10T09:30:00Z') },
      { old_owner_id: areaEntity1.id_entity, new_owner_id: branchEntity1.id_entity, amount: 25.50, transaction_date: new Date('2025-07-01T11:00:00Z') },
      { old_owner_id: areaEntity2.id_entity, new_owner_id: branchEntity2.id_entity, amount: 850.00, transaction_date: new Date('2025-08-19T14:45:00Z') },
      { old_owner_id: userEntity1.id_entity, new_owner_id: areaEntity1.id_entity, amount: 95.20, transaction_date: new Date('2025-09-12T16:00:00Z') },
      { old_owner_id: userEntity2.id_entity, new_owner_id: areaEntity2.id_entity, amount: 10.00, transaction_date: new Date('2025-10-05T18:30:00Z') },
      { old_owner_id: branchEntity1.id_entity, new_owner_id: userEntity1.id_entity, amount: 2000.00, transaction_date: new Date('2025-11-28T21:00:00Z') },
      { old_owner_id: branchEntity2.id_entity, new_owner_id: userEntity2.id_entity, amount: 333.33, transaction_date: new Date('2025-12-15T12:00:00Z') },
      { old_owner_id: areaEntity1.id_entity, new_owner_id: areaEntity2.id_entity, amount: 444.44, transaction_date: new Date('2025-12-31T23:59:59Z') },
    ],
  });
  console.log('Created transactions...');

  // 12. Obtener las transacciones creadas para crear TransactionEntity
  const allTransactions = await prisma.transaction.findMany();
  
  // 13. Crear TransactionEntity (relaciones entre transacciones y entidades)
  const transactionEntityData: { transaction_id: number; id_entity: number; }[] = [];
  
  // Para cada transacción, crear relaciones con entidades relacionadas
  for (let i = 0; i < allTransactions.length; i++) {
    const transaction = allTransactions[i];
    
    // Agregar entidades relacionadas a cada transacción (items, resources, etc.)
    if (i % 4 === 0) {
      // Relacionar con items
      transactionEntityData.push({
        transaction_id: transaction.transaction_id,
        id_entity: itemEntity1.id_entity,
      });
    } else if (i % 4 === 1) {
      // Relacionar con resources
      transactionEntityData.push({
        transaction_id: transaction.transaction_id,
        id_entity: resourceEntity1.id_entity,
      });
    } else if (i % 4 === 2) {
      // Relacionar con areas
      transactionEntityData.push({
        transaction_id: transaction.transaction_id,
        id_entity: areaEntity1.id_entity,
      });
    } else {
      // Relacionar con branches
      transactionEntityData.push({
        transaction_id: transaction.transaction_id,
        id_entity: branchEntity1.id_entity,
      });
    }
  }
  
  await prisma.transactionEntity.createMany({
    data: transactionEntityData,
  });
  console.log('Created transaction-entity relationships...');

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    // process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });