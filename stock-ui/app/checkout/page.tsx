import CheckoutListComponent from "@/components/checkouts/checkout-list";
import { Suspense } from "react";

export default function CheckoutPage() {
    
    return (
        <div>
            <Suspense>
                <CheckoutListComponent />
            </Suspense>
        </div>
    )
}