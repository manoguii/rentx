-- DropForeignKey
ALTER TABLE "specifications" DROP CONSTRAINT "specifications_car_id_fkey";

-- AlterTable
ALTER TABLE "specifications" ALTER COLUMN "car_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "specifications" ADD CONSTRAINT "specifications_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE SET NULL ON UPDATE CASCADE;
