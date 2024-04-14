/*
  Warnings:

  - You are about to drop the column `profileId` on the `Post` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_profileId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "profileId",
ADD COLUMN     "likesCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rePost" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "responseId" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "blocks" (
    "id" TEXT NOT NULL,
    "blockedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "blockedId" TEXT NOT NULL,

    CONSTRAINT "blocks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "blocks" ADD CONSTRAINT "blocks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blocks" ADD CONSTRAINT "blocks_blockedId_fkey" FOREIGN KEY ("blockedId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
