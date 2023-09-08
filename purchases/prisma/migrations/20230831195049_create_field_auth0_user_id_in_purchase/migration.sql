/*
  Warnings:

  - A unique constraint covering the columns `[auth0UserId]` on the table `Purchase` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "auth0UserId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_auth0UserId_key" ON "Purchase"("auth0UserId");
