/*
  Warnings:

  - You are about to drop the column `mediaURL` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Img" ALTER COLUMN "postId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "mediaURL";

-- AddForeignKey
ALTER TABLE "Img" ADD CONSTRAINT "Img_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
