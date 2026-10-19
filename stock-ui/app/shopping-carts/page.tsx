import ShoppingCartListComponent from "@/components/shopping-carts/shopping-cart-list";
import { Suspense } from "react";

export default async function ShoppingCartsPage() {
    return (
        <div>
            <h1 className="mb-4 text-xl font-bold text-gray-800">
                ตะกร้าสินค้า
            </h1>
            <Suspense>
                <ShoppingCartListComponent />
            </Suspense>
        </div>
    )
}