/*
  Warnings:

  - Added the required column `seasonId` to the `Planting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Planting" ADD COLUMN     "seasonId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Season" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlantingInput" (
    "id" TEXT NOT NULL,
    "plantingId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PlantingInput_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Planting" ADD CONSTRAINT "Planting_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlantingInput" ADD CONSTRAINT "PlantingInput_plantingId_fkey" FOREIGN KEY ("plantingId") REFERENCES "Planting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlantingInput" ADD CONSTRAINT "PlantingInput_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
