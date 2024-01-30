-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_cashierUserName_fkey" FOREIGN KEY ("cashierUserName") REFERENCES "users"("userName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customerPhone_fkey" FOREIGN KEY ("customerPhone") REFERENCES "customers"("phone") ON DELETE RESTRICT ON UPDATE CASCADE;
