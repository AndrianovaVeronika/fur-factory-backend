-- CreateTable
CREATE TABLE "FurType" (
    "furTypeId" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "PK_22e3174c4f4f0af5866cd071f65" PRIMARY KEY ("furTypeId")
);

-- CreateTable
CREATE TABLE "GenderCategory" (
    "genderCategoryId" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "PK_750058e6a5668846565ac205cf3" PRIMARY KEY ("genderCategoryId")
);

-- CreateTable
CREATE TABLE "migrations" (
    "id" SERIAL NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "orderId" SERIAL NOT NULL,
    "date" TIMESTAMP(6) NOT NULL,
    "shipped" BOOLEAN NOT NULL DEFAULT false,
    "price" INTEGER NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "PK_b075313d4d7e1c12f1a6e6359e8" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "Product" (
    "productId" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "price" INTEGER NOT NULL,
    "imageName" VARCHAR,
    "productTypeId" INTEGER,
    "genderCategoryId" INTEGER,
    "furTypeId" INTEGER,

    CONSTRAINT "PK_429540a50a9f1fbf87efd047f35" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "ProductType" (
    "productTypeId" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "PK_c2e2e4e18ccee290f84724f603f" PRIMARY KEY ("productTypeId")
);

-- CreateTable
CREATE TABLE "Role" (
    "roleId" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "PK_703705ba862c2bb45250962c9e1" PRIMARY KEY ("roleId")
);

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "name" VARCHAR,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "address" VARCHAR,
    "telephone" VARCHAR,

    CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "_OrderToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RoleToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UQ_6bebf3689c1df9c741739774f7d" ON "FurType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_eafc5e4de1175b7255e5b010dd3" ON "GenderCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_22cc43e9a74d7498546e9a63e77" ON "Product"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_1b7bf43742211271b73c6039c44" ON "Product"("imageName");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_8978484a9cee7a0c780cd259b88" ON "ProductType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_ae4578dcaed5adff96595e61660" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_e12875dfb3b1d92d7d7c5377e22" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_49568c2027c8bc1f33f7878e189" ON "User"("telephone");

-- CreateIndex
CREATE UNIQUE INDEX "_OrderToProduct_AB_unique" ON "_OrderToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderToProduct_B_index" ON "_OrderToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RoleToUser_AB_unique" ON "_RoleToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RoleToUser_B_index" ON "_RoleToUser"("B");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "FK_374bfd0d1b0e1398d7206456d98" FOREIGN KEY ("productTypeId") REFERENCES "ProductType"("productTypeId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "FK_3bed281e24c95c8c70510a8e1f1" FOREIGN KEY ("furTypeId") REFERENCES "FurType"("furTypeId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "FK_e559f1a5bf6bc560afefc278ade" FOREIGN KEY ("genderCategoryId") REFERENCES "GenderCategory"("genderCategoryId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "_OrderToProduct" ADD CONSTRAINT "_OrderToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Order"("orderId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToProduct" ADD CONSTRAINT "_OrderToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("productId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToUser" ADD CONSTRAINT "_RoleToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Role"("roleId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToUser" ADD CONSTRAINT "_RoleToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

