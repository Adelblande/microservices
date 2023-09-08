/*
  Warnings:

  - You are about to drop the column `auth0UserId` on the `Purchase` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[authUserId]` on the table `Purchase` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Purchase_auth0UserId_key";

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "auth0UserId",
ADD COLUMN     "authUserId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_authUserId_key" ON "Purchase"("authUserId");
