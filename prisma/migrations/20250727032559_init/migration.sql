-- CreateTable
CREATE TABLE "EntityType" (
    "id_entity_type" SERIAL NOT NULL,
    "name_entity_type" VARCHAR(100) NOT NULL,

    CONSTRAINT "EntityType_pkey" PRIMARY KEY ("id_entity_type")
);

-- CreateTable
CREATE TABLE "Entity" (
    "id_entity" SERIAL NOT NULL,
    "id_entity_type" INTEGER NOT NULL,

    CONSTRAINT "Entity_pkey" PRIMARY KEY ("id_entity")
);

-- CreateTable
CREATE TABLE "EntityOwnership" (
    "id_owner_entity" INTEGER NOT NULL,
    "id_owned_entity" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "EntityOwnership_pkey" PRIMARY KEY ("id_owner_entity","id_owned_entity")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "transaction_id" SERIAL NOT NULL,
    "transaction_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "old_owner_id" INTEGER NOT NULL,
    "new_owner_id" INTEGER NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("transaction_id")
);

-- CreateTable
CREATE TABLE "TransactionEntity" (
    "transaction_id" INTEGER NOT NULL,
    "id_entity" INTEGER NOT NULL,

    CONSTRAINT "TransactionEntity_pkey" PRIMARY KEY ("transaction_id","id_entity")
);

-- CreateTable
CREATE TABLE "ItemType" (
    "id_item_type" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "ItemType_pkey" PRIMARY KEY ("id_item_type")
);

-- CreateTable
CREATE TABLE "Item" (
    "id_item" TEXT NOT NULL,
    "name_item" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "provider" VARCHAR(255) NOT NULL,
    "id_item_type" INTEGER NOT NULL,
    "id_entity" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id_item")
);

-- CreateTable
CREATE TABLE "Resource" (
    "resource_id" TEXT NOT NULL,
    "resourcename" VARCHAR(255) NOT NULL,
    "measure" VARCHAR(100) NOT NULL,
    "currency" VARCHAR(10) NOT NULL,
    "description" TEXT NOT NULL,
    "id_entity" INTEGER NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("resource_id")
);

-- CreateTable
CREATE TABLE "Area" (
    "area_id" TEXT NOT NULL,
    "areaname" VARCHAR(255) NOT NULL,
    "pattern_area_id" VARCHAR(100) NOT NULL,
    "branch_id" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "description" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "id_entity" INTEGER NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("area_id")
);

-- CreateTable
CREATE TABLE "Branch" (
    "id_branch" TEXT NOT NULL,
    "name_branch" VARCHAR(255) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT true,
    "id_entity" INTEGER NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id_branch")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id_user_rol" SERIAL NOT NULL,
    "name_user_rol" VARCHAR(100) NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id_user_rol")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "id_entity" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "UserUserRole" (
    "user_id" TEXT NOT NULL,
    "id_user_rol" INTEGER NOT NULL,

    CONSTRAINT "UserUserRole_pkey" PRIMARY KEY ("user_id","id_user_rol")
);

-- CreateIndex
CREATE UNIQUE INDEX "EntityType_name_entity_type_key" ON "EntityType"("name_entity_type");

-- CreateIndex
CREATE UNIQUE INDEX "ItemType_name_key" ON "ItemType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Item_id_entity_key" ON "Item"("id_entity");

-- CreateIndex
CREATE UNIQUE INDEX "Resource_id_entity_key" ON "Resource"("id_entity");

-- CreateIndex
CREATE UNIQUE INDEX "Area_id_entity_key" ON "Area"("id_entity");

-- CreateIndex
CREATE UNIQUE INDEX "Branch_id_entity_key" ON "Branch"("id_entity");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_name_user_rol_key" ON "UserRole"("name_user_rol");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_entity_key" ON "User"("id_entity");

-- AddForeignKey
ALTER TABLE "Entity" ADD CONSTRAINT "Entity_id_entity_type_fkey" FOREIGN KEY ("id_entity_type") REFERENCES "EntityType"("id_entity_type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntityOwnership" ADD CONSTRAINT "EntityOwnership_id_owner_entity_fkey" FOREIGN KEY ("id_owner_entity") REFERENCES "Entity"("id_entity") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntityOwnership" ADD CONSTRAINT "EntityOwnership_id_owned_entity_fkey" FOREIGN KEY ("id_owned_entity") REFERENCES "Entity"("id_entity") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_old_owner_id_fkey" FOREIGN KEY ("old_owner_id") REFERENCES "Entity"("id_entity") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_new_owner_id_fkey" FOREIGN KEY ("new_owner_id") REFERENCES "Entity"("id_entity") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionEntity" ADD CONSTRAINT "TransactionEntity_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "Transaction"("transaction_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionEntity" ADD CONSTRAINT "TransactionEntity_id_entity_fkey" FOREIGN KEY ("id_entity") REFERENCES "Entity"("id_entity") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_id_item_type_fkey" FOREIGN KEY ("id_item_type") REFERENCES "ItemType"("id_item_type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_id_entity_fkey" FOREIGN KEY ("id_entity") REFERENCES "Entity"("id_entity") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_id_entity_fkey" FOREIGN KEY ("id_entity") REFERENCES "Entity"("id_entity") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Area" ADD CONSTRAINT "Area_id_entity_fkey" FOREIGN KEY ("id_entity") REFERENCES "Entity"("id_entity") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_id_entity_fkey" FOREIGN KEY ("id_entity") REFERENCES "Entity"("id_entity") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_entity_fkey" FOREIGN KEY ("id_entity") REFERENCES "Entity"("id_entity") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserUserRole" ADD CONSTRAINT "UserUserRole_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserUserRole" ADD CONSTRAINT "UserUserRole_id_user_rol_fkey" FOREIGN KEY ("id_user_rol") REFERENCES "UserRole"("id_user_rol") ON DELETE RESTRICT ON UPDATE CASCADE;
