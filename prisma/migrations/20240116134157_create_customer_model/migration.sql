-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "gender" INTEGER NOT NULL,
    "age" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "accountLevel" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "block" BOOLEAN NOT NULL DEFAULT false,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);
