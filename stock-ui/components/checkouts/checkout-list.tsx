
"use client";

import { shoppingCartService } from "@/services/shopping-cart-service";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type CartItem = {
    id: number;
    name: string;
    amount: number;
    price: number;
};

// const initialItems: CartItem[] = [
//     {
//         id: 3,
//         name: "iPhone 15",
//         amount: 96,
//         price: 22000,
//     },
//     {
//         id: 4,
//         name: "iPhone 16",
//         amount: 1,
//         price: 32000,
//     },
// ];

export default async function CheckoutListComponent() {
    const [items, setItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        setLoading(true);
        shoppingCartService.getShoppingCarts().then((responses: any) => {
            setItems(responses.value);
            setLoading(false);
        });
    }, []);

    const totalAmount = useMemo(
        () => items.reduce((sum, item) => sum + item.amount, 0),
        [items]
    );

    const totalPrice = useMemo(
        () =>
            items.reduce(
                (sum, item) => sum + item.amount * item.price,
                0
            ),
        [items]
    );

    function updateAmount(id: number, amount: number) {
        if (amount < 1) return;

        setItems((currentItems) =>
            currentItems.map((item) =>
                item.id === id ? { ...item, amount } : item
            )
        );
    }

    async function handleCheckout() {
        if (items.length === 0 || loading) return;

        try {
            setLoading(true);

            // TODO: เรียก API เพื่อสร้างคำสั่งซื้อจริง
            console.log("Checkout items:", items);
            console.log("Total price:", totalPrice);

            alert("Checkout สำเร็จ");
        } catch (error) {
            console.error("Checkout error:", error);
            alert("ไม่สามารถดำเนินการสั่งซื้อได้");
        } finally {
            setLoading(false);
        }
    }

    const formatPrice = (price: number) =>
        price.toLocaleString("th-TH", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    return (
        <main className="min-h-screen bg-gray-100 p-4 sm:p-6">
            <div className="mx-auto max-w-3xl">
                <h1 className="text-2xl font-bold text-gray-800">
                    Checkout
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    ตรวจสอบรายการสินค้าก่อนยืนยันคำสั่งซื้อ
                </p>

                {/* Product list */}
                <section className="mt-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                    <h2 className="mb-4 font-semibold text-gray-800">
                        รายการสินค้า ({items.length} รายการ)
                    </h2>

                    {items.length === 0 ? (
                        <p className="py-8 text-center text-gray-500">
                            ไม่มีสินค้าในตะกร้า
                        </p>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs text-gray-400">
                                            Product ID: {item.id}
                                        </p>

                                        <h3 className="mt-1 font-semibold text-gray-800">
                                            {item.name}
                                        </h3>

                                        <p className="mt-1 text-sm text-gray-500">
                                            ฿{formatPrice(item.price)} / ชิ้น
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                                        {/* Quantity */}
                                        <div className="flex items-center gap-3">

                                        </div>

                                        {/* Subtotal */}
                                        <p className="w-32 text-right font-semibold text-gray-800">
                                            ฿{formatPrice(
                                                item.price * item.amount
                                            )}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Order summary */}
                <section className="mt-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                    <h2 className="font-semibold text-gray-800">
                        สรุปคำสั่งซื้อ
                    </h2>

                    <div className="mt-4 flex justify-between text-sm text-gray-600">
                        <span>จำนวนสินค้าทั้งหมด</span>
                        <span>{totalAmount} ชิ้น</span>
                    </div>

                    <div className="mt-3 flex justify-between text-sm text-gray-600">
                        <span>ค่าจัดส่ง</span>
                        <span>ฟรี</span>
                    </div>

                    <div className="my-4 border-t border-gray-100" />

                    <div className="flex items-center justify-between gap-3">
                        <span className="font-semibold text-gray-800">
                            ยอดชำระทั้งหมด
                        </span>

                        <span className="text-xl font-bold text-blue-600">
                            ฿{formatPrice(totalPrice)}
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={handleCheckout}
                        disabled={items.length === 0 || loading}
                        className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                    >
                        {loading
                            ? "กำลังดำเนินการ..."
                            : "ยืนยันคำสั่งซื้อ"}
                    </button>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-lg mt-5 w-full justify-center
                       border border-blue-600 px-4 py-2
                       text-sm font-medium text-blue-600
                       transition-colors
                       hover:bg-blue-600 hover:text-white
                       focus:outline-none focus:ring-2
                       focus:ring-blue-500 focus:ring-offset-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m12 19-7-7 7-7" />
                            <path d="M19 12H5" />
                        </svg>

                        กลับหน้าหลัก
                    </Link>
                </section>
            </div>
        </main>
    );
}
