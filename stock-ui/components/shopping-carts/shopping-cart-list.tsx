import { shoppingCartService } from "@/services/shopping-cart-service";
import CartItemComponent from "./cart-item";
import Link from "next/link";
import ClearAllComponent from "./clear-all";

export default async function ShoppingCartListComponent() {
    const responses: any = await shoppingCartService.getShoppingCarts();

    console.log("Shopping cart responses:", responses);
    
    return (
        <div>
            <ClearAllComponent value={responses.value} />
            {responses.value.map((cart: any) => (
                <CartItemComponent
                    key={cart.id}
                    id={cart.id}
                    name={cart.name}
                    amount={cart.amount}
                    price={cart.price}
                    productId={cart.productId}
                />
            ))}
            <Link
                        href="/checkout"
                        className="inline-flex items-center gap-2 rounded-lg mt-5 justify-center
                       border border-blue-600 px-4 py-2
                       text-sm font-medium text-blue-600
                       transition-colors
                       hover:bg-blue-600 hover:text-white
                       focus:outline-none focus:ring-2
                       focus:ring-blue-500 focus:ring-offset-2"
                    >

                        ชำระเงิน
                    </Link>
        </div>
    )
}