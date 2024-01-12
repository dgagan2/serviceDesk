-- CreateTable
CREATE TABLE "comments" (
    "idComment" SMALLSERIAL NOT NULL,
    "ticketNumber" SMALLINT NOT NULL,
    "idUser" VARCHAR(50) NOT NULL,
    "creationDate" TIMESTAMP(6),
    "comment" TEXT NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("idComment")
);

-- CreateTable
CREATE TABLE "department" (
    "idDepartment" SMALLSERIAL NOT NULL,
    "departmentName" VARCHAR(20) NOT NULL,

    CONSTRAINT "department_pkey" PRIMARY KEY ("idDepartment")
);

-- CreateTable
CREATE TABLE "serviceCategories" (
    "idCategory" SMALLSERIAL NOT NULL,
    "categoryName" VARCHAR(30) NOT NULL,

    CONSTRAINT "serviceCategories_pkey" PRIMARY KEY ("idCategory")
);

-- CreateTable
CREATE TABLE "services" (
    "idService" SMALLSERIAL NOT NULL,
    "serviceName" VARCHAR(30) NOT NULL,
    "servicePoster" VARBIT NOT NULL,
    "serviceDescription" VARCHAR(255),
    "idCategory" SMALLINT,

    CONSTRAINT "services_pkey" PRIMARY KEY ("idService")
);

-- CreateTable
CREATE TABLE "ticketStatus" (
    "idStatus" SMALLSERIAL NOT NULL,
    "statusName" VARCHAR(15) NOT NULL,

    CONSTRAINT "ticketStatus_pkey" PRIMARY KEY ("idStatus")
);

-- CreateTable
CREATE TABLE "tickets" (
    "ticketNumber" SERIAL NOT NULL,
    "request" TEXT NOT NULL,
    "idUser" VARCHAR(50) NOT NULL,
    "idDepartment" SMALLSERIAL NOT NULL,
    "idService" SMALLINT NOT NULL,
    "creationDate" TIMESTAMP(6),
    " ticketStatus" SMALLINT NOT NULL,
    "serviceDescription" VARCHAR(255),
    "idAgent" VARCHAR(50),
    "updateDate" TIMESTAMP(6),

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("ticketNumber")
);

-- CreateTable
CREATE TABLE "userRoles" (
    "idRole" SMALLSERIAL NOT NULL,
    "roleName" VARCHAR(15) NOT NULL,

    CONSTRAINT "userRoles_pkey" PRIMARY KEY ("idRole")
);

-- CreateTable
CREATE TABLE "userStates" (
    "idState" SERIAL NOT NULL,
    "stateName" VARCHAR(15) NOT NULL,

    CONSTRAINT "userStates_pkey" PRIMARY KEY ("idState")
);

-- CreateTable
CREATE TABLE "users" (
    "idUser" VARCHAR(50) NOT NULL,
    "email" VARCHAR(40) NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "idDepartment" SMALLINT,
    "idRole" SMALLINT,
    "idState" SMALLINT,
    "password" VARCHAR(30) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("idUser")
);

-- CreateIndex
CREATE UNIQUE INDEX "departmentName" ON "department"("departmentName");

-- CreateIndex
CREATE UNIQUE INDEX "categoryName" ON "serviceCategories"("categoryName");

-- CreateIndex
CREATE UNIQUE INDEX "statusName" ON "ticketStatus"("statusName");

-- CreateIndex
CREATE UNIQUE INDEX "roleName" ON "userRoles"("roleName");

-- CreateIndex
CREATE UNIQUE INDEX "stateName" ON "userStates"("stateName");

-- CreateIndex
CREATE UNIQUE INDEX "email" ON "users"("email");

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("idUser") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_ticketNumber_fkey" FOREIGN KEY ("ticketNumber") REFERENCES "tickets"("ticketNumber") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_idCategory_fkey" FOREIGN KEY ("idCategory") REFERENCES "serviceCategories"("idCategory") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_ ticketStatus_fkey" FOREIGN KEY (" ticketStatus") REFERENCES "ticketStatus"("idStatus") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_idAgent_fkey" FOREIGN KEY ("idAgent") REFERENCES "users"("idUser") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_idDepartment_fkey" FOREIGN KEY ("idDepartment") REFERENCES "department"("idDepartment") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_idService_fkey" FOREIGN KEY ("idService") REFERENCES "services"("idService") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("idUser") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_idDepartment_fkey" FOREIGN KEY ("idDepartment") REFERENCES "department"("idDepartment") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_idRole_fkey" FOREIGN KEY ("idRole") REFERENCES "userRoles"("idRole") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_idState_fkey" FOREIGN KEY ("idState") REFERENCES "userStates"("idState") ON DELETE NO ACTION ON UPDATE CASCADE;
