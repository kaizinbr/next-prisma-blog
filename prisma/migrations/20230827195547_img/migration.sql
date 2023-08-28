-- CreateTable
CREATE TABLE "Img" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "subtitle" TEXT,
    "author" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Img_pkey" PRIMARY KEY ("id")
);
