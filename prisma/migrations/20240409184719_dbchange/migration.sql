/*
  Warnings:

  - You are about to drop the column `html` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `imageAlt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `imageTitle` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `imageURL` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `json` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `serifed` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `subtitle` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToPost` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `postId` to the `Img` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToPost" DROP CONSTRAINT "_CategoryToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToPost" DROP CONSTRAINT "_CategoryToPost_B_fkey";

-- AlterTable
ALTER TABLE "Img" ADD COLUMN     "postId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "html",
DROP COLUMN "imageAlt",
DROP COLUMN "imageTitle",
DROP COLUMN "imageURL",
DROP COLUMN "json",
DROP COLUMN "published",
DROP COLUMN "serifed",
DROP COLUMN "subtitle",
DROP COLUMN "tags",
DROP COLUMN "title",
ADD COLUMN     "content" TEXT,
ADD COLUMN     "mediaURL" TEXT[];

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "_CategoryToPost";

-- CreateTable
CREATE TABLE "Follower" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "followerId" TEXT NOT NULL,
    "followedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Follower_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
