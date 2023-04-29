/*
  Warnings:

  - You are about to drop the column `carId` on the `rentals` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `rentals` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `users_tokens` table. All the data in the column will be lost.
  - Added the required column `car_id` to the `rentals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `rentals` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "rentals" DROP CONSTRAINT "rentals_carId_fkey";

-- DropForeignKey
ALTER TABLE "rentals" DROP CONSTRAINT "rentals_userId_fkey";

-- DropForeignKey
ALTER TABLE "users_tokens" DROP CONSTRAINT "users_tokens_userId_fkey";

-- AlterTable
ALTER TABLE "rentals" DROP COLUMN "carId",
DROP COLUMN "userId",
ADD COLUMN     "car_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users_tokens" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "rentals" ADD CONSTRAINT "rentals_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rentals" ADD CONSTRAINT "rentals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_tokens" ADD CONSTRAINT "users_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
