/*
  Warnings:

  - You are about to drop the column `deleted` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `_PostToProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PostToProfile" DROP CONSTRAINT "_PostToProfile_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostToProfile" DROP CONSTRAINT "_PostToProfile_B_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "deleted",
DROP COLUMN "deleted_at",
DROP COLUMN "images",
DROP COLUMN "likes",
ADD COLUMN     "imageAlt" TEXT,
ADD COLUMN     "imageTitle" TEXT,
ADD COLUMN     "imageURL" TEXT,
ADD COLUMN     "profileId" TEXT;

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "color" SET DEFAULT '#59656F';

-- DropTable
DROP TABLE "_PostToProfile";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
