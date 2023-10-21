-- CreateTable
CREATE TABLE " department" (
    "id" SERIAL NOT NULL,
    "nameDepartment" VARCHAR NOT NULL,

    CONSTRAINT " department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categoryService" (
    "idCategory" SERIAL NOT NULL,
    "nameCategory" VARCHAR(70) NOT NULL,
    "idItem" INTEGER,

    CONSTRAINT "categoryService_pkey" PRIMARY KEY ("idCategory")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" SERIAL NOT NULL,
    "numberTicket" INTEGER,
    "IdUser" VARCHAR(70),
    "creationDate" DATE NOT NULL DEFAULT CURRENT_DATE,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itemService" (
    "id" SERIAL NOT NULL,
    "nameItem" VARCHAR,
    "idCategory" INTEGER,

    CONSTRAINT "itemService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "person" (
    "id" VARCHAR NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "idDepartment" INTEGER,
    "idRole" INTEGER,
    "idState" INTEGER,
    "password" TEXT NOT NULL,

    CONSTRAINT "person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roleUser" (
    "idRole" SERIAL NOT NULL,
    "nameRole" VARCHAR NOT NULL,

    CONSTRAINT "roleUser_pkey" PRIMARY KEY ("idRole")
);

-- CreateTable
CREATE TABLE "stateTicket" (
    "id" SERIAL NOT NULL,
    "nameState" VARCHAR NOT NULL,

    CONSTRAINT "stateTicket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stateUser" (
    "idState" SERIAL NOT NULL,
    "nameState" VARCHAR NOT NULL,

    CONSTRAINT "stateUser_pkey" PRIMARY KEY ("idState")
);

-- CreateTable
CREATE TABLE "ticket" (
    "numberTicket" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "idUser" VARCHAR,
    "idDepartment" INTEGER,
    "idItem" INTEGER,
    "creationDate" DATE,
    "idStateTicket" INTEGER,
    "idComment" INTEGER,
    "idAgent" VARCHAR,

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("numberTicket")
);

-- CreateIndex
CREATE UNIQUE INDEX "nameDepartment" ON " department"("nameDepartment");

-- CreateIndex
CREATE UNIQUE INDEX "categoryService_nameCategory_key" ON "categoryService"("nameCategory");

-- CreateIndex
CREATE UNIQUE INDEX "idItem" ON "categoryService"("idItem");

-- CreateIndex
CREATE UNIQUE INDEX "itemService_nameItem_key" ON "itemService"("nameItem");

-- CreateIndex
CREATE UNIQUE INDEX "email" ON "person"("email");

-- CreateIndex
CREATE UNIQUE INDEX "roleUser_nameRole_key" ON "roleUser"("nameRole");

-- CreateIndex
CREATE UNIQUE INDEX "stateTicket_nameState_key" ON "stateTicket"("nameState");

-- CreateIndex
CREATE UNIQUE INDEX "stateUser_nameState_key" ON "stateUser"("nameState");

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_IdUser_fkey" FOREIGN KEY ("IdUser") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_numberTicket_fkey" FOREIGN KEY ("numberTicket") REFERENCES "ticket"("numberTicket") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itemService" ADD CONSTRAINT "itemService_id_fkey" FOREIGN KEY ("id") REFERENCES "categoryService"("idItem") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "person" ADD CONSTRAINT "person_idDepartment_fkey" FOREIGN KEY ("idDepartment") REFERENCES " department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "person" ADD CONSTRAINT "person_idRole_fkey" FOREIGN KEY ("idRole") REFERENCES "roleUser"("idRole") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "person" ADD CONSTRAINT "person_idState_fkey" FOREIGN KEY ("idState") REFERENCES "stateUser"("idState") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_idAgent_fkey" FOREIGN KEY ("idAgent") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_idDepartment_fkey" FOREIGN KEY ("idDepartment") REFERENCES " department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_idItem_fkey" FOREIGN KEY ("idItem") REFERENCES "itemService"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_idStateTicket_fkey" FOREIGN KEY ("idStateTicket") REFERENCES "stateTicket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
