-- CreateTable
CREATE TABLE "EntityType" (
    "id_entity_type" INTEGER NOT NULL,
    "name_entity_type" TEXT NOT NULL,

    CONSTRAINT "EntityType_pkey" PRIMARY KEY ("id_entity_type")
);

-- CreateTable
CREATE TABLE "Entity" (
    "id_entity" INTEGER NOT NULL,
    "name_entity" TEXT NOT NULL,
    "id_entity_type" INTEGER NOT NULL,

    CONSTRAINT "Entity_pkey" PRIMARY KEY ("id_entity")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id_transaction" INTEGER NOT NULL,
    "date_transaction" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_old_owner" INTEGER NOT NULL,
    "id_new_owner" INTEGER NOT NULL,
    "amount" INTEGER,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id_transaction")
);

-- CreateTable
CREATE TABLE "TransactionEntity" (
    "id_transaction" INTEGER NOT NULL,
    "id_entity" INTEGER NOT NULL,

    CONSTRAINT "TransactionEntity_pkey" PRIMARY KEY ("id_transaction","id_entity")
);

-- CreateTable
CREATE TABLE "CustomProperty" (
    "id_custom_property" INTEGER NOT NULL,
    "name_custom_property" TEXT NOT NULL,
    "type_custom_property" TEXT NOT NULL,

    CONSTRAINT "CustomProperty_pkey" PRIMARY KEY ("id_custom_property")
);

-- CreateTable
CREATE TABLE "CustomPropertyEntityValue" (
    "id_entity" INTEGER NOT NULL,
    "id_custom_property" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "CustomPropertyEntityValue_pkey" PRIMARY KEY ("id_entity","id_custom_property")
);

-- CreateTable
CREATE TABLE "ItemType" (
    "id_item_type" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ItemType_pkey" PRIMARY KEY ("id_item_type")
);

-- CreateTable
CREATE TABLE "Item" (
    "id_item" TEXT NOT NULL,
    "id_item_type" INTEGER NOT NULL,
    "name_item" TEXT NOT NULL,
    "description" TEXT,
    "provider" TEXT NOT NULL,
    "id_entity" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id_item")
);

-- CreateTable
CREATE TABLE "Resource" (
    "id_resource" TEXT NOT NULL,
    "id_entity" INTEGER NOT NULL,
    "measure" TEXT,
    "currency" TEXT,
    "description" TEXT,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id_resource")
);

-- CreateTable
CREATE TABLE "Branch" (
    "id_branch" TEXT NOT NULL,
    "id_entity" INTEGER NOT NULL,
    "city" TEXT,
    "phone" TEXT,
    "state" BOOLEAN NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id_branch")
);

-- CreateTable
CREATE TABLE "Area" (
    "id_area" TEXT NOT NULL,
    "id_entity" INTEGER NOT NULL,
    "id_pattern_area" TEXT,
    "id_branch" TEXT NOT NULL,
    "phone" TEXT,
    "description" TEXT,
    "state" BOOLEAN NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id_area")
);

-- CreateTable
CREATE TABLE "UserRol" (
    "id_user_rol" INTEGER NOT NULL,
    "name_user_rol" TEXT NOT NULL,

    CONSTRAINT "UserRol_pkey" PRIMARY KEY ("id_user_rol")
);

-- CreateTable
CREATE TABLE "User" (
    "id_user" TEXT NOT NULL,
    "id_entity" INTEGER NOT NULL,
    "id_user_rol" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateIndex
CREATE UNIQUE INDEX "EntityType_name_entity_type_key" ON "EntityType"("name_entity_type");

-- CreateIndex
CREATE UNIQUE INDEX "ItemType_name_key" ON "ItemType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserRol_name_user_rol_key" ON "UserRol"("name_user_rol");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Entity" ADD CONSTRAINT "Entity_id_entity_type_fkey" FOREIGN KEY ("id_entity_type") REFERENCES "EntityType"("id_entity_type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_id_old_owner_fkey" FOREIGN KEY ("id_old_owner") REFERENCES "Entity"("id_entity") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_id_new_owner_fkey" FOREIGN KEY ("id_new_owner") REFERENCES "Entity"("id_entity") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionEntity" ADD CONSTRAINT "TransactionEntity_id_transaction_fkey" FOREIGN KEY ("id_transaction") REFERENCES "Transaction"("id_transaction") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionEntity" ADD CONSTRAINT "TransactionEntity_id_entity_fkey" FOREIGN KEY ("id_entity") REFERENCES "Entity"("id_entity") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomPropertyEntityValue" ADD CONSTRAINT "CustomPropertyEntityValue_id_entity_fkey" FOREIGN KEY ("id_entity") REFERENCES "Entity"("id_entity") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomPropertyEntityValue" ADD CONSTRAINT "CustomPropertyEntityValue_id_custom_property_fkey" FOREIGN KEY ("id_custom_property") REFERENCES "CustomProperty"("id_custom_property") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_id_item_type_fkey" FOREIGN KEY ("id_item_type") REFERENCES "ItemType"("id_item_type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_id_entity_fkey" FOREIGN KEY ("id_entity") REFERENCES "Entity"("id_entity") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_id_entity_fkey" FOREIGN KEY ("id_entity") REFERENCES "Entity"("id_entity") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_id_entity_fkey" FOREIGN KEY ("id_entity") REFERENCES "Entity"("id_entity") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Area" ADD CONSTRAINT "Area_id_entity_fkey" FOREIGN KEY ("id_entity") REFERENCES "Entity"("id_entity") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Area" ADD CONSTRAINT "Area_id_branch_fkey" FOREIGN KEY ("id_branch") REFERENCES "Branch"("id_branch") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Area" ADD CONSTRAINT "Area_id_pattern_area_fkey" FOREIGN KEY ("id_pattern_area") REFERENCES "Area"("id_area") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_user_rol_fkey" FOREIGN KEY ("id_user_rol") REFERENCES "UserRol"("id_user_rol") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_entity_fkey" FOREIGN KEY ("id_entity") REFERENCES "Entity"("id_entity") ON DELETE RESTRICT ON UPDATE CASCADE;
