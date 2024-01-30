-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "customerPayment" INTEGER NOT NULL,
    "customerPaymentMethod" INTEGER NOT NULL,
    "counterID" INTEGER NOT NULL,
    "cashierUserName" TEXT NOT NULL,
    "couponsAmount" INTEGER NOT NULL,
    "totalExpense" INTEGER NOT NULL,
    "totalAmount" INTEGER NOT NULL,
    "totalDiscount" INTEGER NOT NULL,
    "exchange" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orderDetails" (
    "id" SERIAL NOT NULL,
    "orderID" INTEGER NOT NULL,
    "productSKU" TEXT NOT NULL,
    "purchasedQuantity" INTEGER NOT NULL,
    "totalExpense" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orderDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orderDetails" ADD CONSTRAINT "orderDetails_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
