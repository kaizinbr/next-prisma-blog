/*
  Warnings:

  - You are about to drop the column `rePost` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "rePost",
ADD COLUMN     "isRepost" BOOLEAN NOT NULL DEFAULT false;
