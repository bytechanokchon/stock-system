"use client";

import { shoppingCartService } from "@/services/shopping-cart-service";

type Props = {
    id: number;
    name: string;
    amount: number;
    price: number;
}

export default function ProductItemComponent({ id, name, amount, price }: Props) {
    function addToCart() {
        shoppingCartService.createShoppingCart({ productId: id, amount: 1 }).then((response: any) => {
            if (response.isSuccess) {
                alert("เพิ่มสินค้าลงตะกร้าเรียบร้อยแล้ว");
            } else {
                alert("เกิดข้อผิดพลาดในการเพิ่มสินค้าลงตะกร้า");
            }
        }).catch((error) => {
            console.error("Error adding product to cart:", error);
            alert("เกิดข้อผิดพลาดในการเพิ่มสินค้าลงตะกร้า");
        });
    }

    return (
        <div
              key={id}
              className="rounded-xl border border-gray-200
                         bg-white p-3 shadow-sm
                         transition hover:shadow-md"
            >
              <p className="text-xs text-gray-400">
                ID: {id}
              </p>

              <h2 className="mt-2 line-clamp-2 min-h-10
                             text-sm font-semibold text-gray-800">
                {name}
              </h2>

              <p className="mt-2 text-lg font-bold text-blue-600">
                ฿{price.toLocaleString("th-TH", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                คงเหลือ {amount} ชิ้น
              </p>

              <button
                type="button"
                onClick={() => addToCart()}
                disabled={amount <= 0}
                className="mt-3 w-full rounded-lg bg-blue-600
                           px-1 py-2 text-xs font-medium text-white
                           transition hover:bg-blue-700
                           disabled:cursor-not-allowed
                           disabled:bg-gray-300"
              >
                {amount > 0
                  ? "+ เพิ่มลงตะกร้า"
                  : "สินค้าหมด"}
              </button>
            </div>
    )
}