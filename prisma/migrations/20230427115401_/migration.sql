/*
  Warnings:

  - A unique constraint covering the columns `[refresh_token]` on the table `users_tokens` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `users_tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_tokens_refresh_token_key" ON "users_tokens"("refresh_token");

-- CreateIndex
CREATE UNIQUE INDEX "users_tokens_user_id_key" ON "users_tokens"("user_id");
