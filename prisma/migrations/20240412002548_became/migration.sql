-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "userId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "LikesByUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "LikesByUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LikesByUser" ADD CONSTRAINT "LikesByUser_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikesByUser" ADD CONSTRAINT "LikesByUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
