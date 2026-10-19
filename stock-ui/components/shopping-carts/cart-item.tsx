
"use client";

import { shoppingCartService } from "@/services/shopping-cart-service";
import { useState } from "react";

type Props = {
    id: number;
    name: string;
    amount: number;
    price: number;
    onAmountChange?: (id: number, amount: number) => void;
    productId: number;
};

export default function CartItemComponent({
    id,
    name,
    amount,
    price,
    onAmountChange,
    productId
}: Props) {
    const [quantity, setQuantity] = useState(amount);

    function updateAmount(newAmount: number) {
        if (newAmount < 0) return;

        setQuantity(newAmount);
        onAmountChange?.(id, newAmount);

        shoppingCartService.updateShoppingCart({ shoppingCartId: id, productId: productId, amount: newAmount })
            .then((response: any) => {
                if (!response.isSuccess) {
                    alert("เกิดข้อผิดพลาดในการอัปเดตจำนวนสินค้า");
                }
            })
            .catch((error) => {
                console.error("Error updating cart item:", error);
                alert("เกิดข้อผิดพลาดในการอัปเดตจำนวนสินค้า");
            });
    }

    const totalPrice = price * quantity;

    return (
        <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
            {/* Product information */}
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-400">
                        Product ID: {id}
                    </p>

                    <h2 className="mt-1 truncate text-base font-semibold text-gray-800">
                        {name}
                    </h2>

                    <p className="mt-2 text-lg font-bold text-blue-600">
                        ฿{price.toLocaleString("th-TH")}
                    </p>

                    <p className="text-xs text-gray-500">
                        ราคาต่อชิ้น
                    </p>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect x="6" y="2" width="12" height="20" rx="2" />
                        <path d="M11 18h2" />
                    </svg>
                </div>
            </div>

            <div className="my-4 border-t border-gray-100" />

            {/* Quantity controls */}
            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                    จำนวนสินค้า
                </span>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => updateAmount(quantity - 1)}
                        disabled={quantity <= 0}
                        aria-label="ลดจำนวนสินค้า"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        −
                    </button>

                    <span className="min-w-5 text-center text-sm font-semibold">
                        {quantity}
                    </span>

                    <button
                        type="button"
                        onClick={() => updateAmount(quantity + 1)}
                        aria-label="เพิ่มจำนวนสินค้า"
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white transition hover:bg-blue-700"
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Total price */}
            <div className="mt-4 flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <span className="text-sm text-gray-600">
                    ราคารวม
                </span>

                <span className="text-base font-bold text-gray-900">
                    ฿{totalPrice.toLocaleString("th-TH")}
                </span>
            </div>
        </div>
    );
}
