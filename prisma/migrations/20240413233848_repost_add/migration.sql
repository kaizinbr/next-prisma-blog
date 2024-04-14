-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "repostedId" TEXT;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_repostedId_fkey" FOREIGN KEY ("repostedId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
