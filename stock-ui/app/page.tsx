import ProductListComponent from "@/components/products/product-list";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <div className="mb-4 flex items-center gap-5">
        <span className="text-xl font-bold text-gray-800">
          รายการสินค้า
        </span>
        <Link
          href="/shopping-carts"
          className="mt-3 w-[100px] rounded-lg bg-blue-600
                           px-1 py-2 text-xs font-medium text-white
                           transition hover:bg-blue-700
                           disabled:cursor-not-allowed
                           disabled:bg-gray-300 text-center"
        >
          {"ตระกร้าสินค้า"}
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <Suspense fallback={<div>Loading...</div>}>
          <ProductListComponent />
        </Suspense>
      </div>
    </div>
  )
}