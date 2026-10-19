"use client";

import { shoppingCartService } from "@/services/shopping-cart-service";
import { useRouter } from "next/router";

type Props = {
    value: any
}


export default function ClearAllComponent({ value }: Props) {
    // const router = useRouter();
    
    function onClearAll() {
        const carts = [];

        for (const cart of value) {
            console.log("Clearing cart:", cart);
            carts.push({
                shoppingCartId: cart.id,
                productId: cart.productId,
                amount: 0
            });
        }

        shoppingCartService.clearShoppingCarts(carts).then((response: any) => {
            if (response.isSuccess) {
                // router.push("");
                alert("ล้างข้อมูลเรียบร้อยแล้ว");
            } else {
                alert("เกิดข้อผิดพลาดในการล้างข้อมูล");
            }
        });
    }

    return (
        <button onClick={onClearAll}>ล้างข้อมูล</button>
    )
}