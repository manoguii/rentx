/*
  Warnings:

  - You are about to drop the `specifications_cars` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[driver_license]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `users_tokens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `car_id` to the `specifications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "specifications_cars" DROP CONSTRAINT "specifications_cars_car_id_fkey";

-- DropForeignKey
ALTER TABLE "specifications_cars" DROP CONSTRAINT "specifications_cars_specification_id_fkey";

-- AlterTable
ALTER TABLE "specifications" ADD COLUMN     "car_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "specifications_cars";

-- CreateIndex
CREATE UNIQUE INDEX "users_driver_license_key" ON "users"("driver_license");

-- CreateIndex
CREATE UNIQUE INDEX "users_tokens_user_id_key" ON "users_tokens"("user_id");

-- AddForeignKey
ALTER TABLE "specifications" ADD CONSTRAINT "specifications_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
