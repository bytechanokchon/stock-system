import { apiGet, apiPost } from "@/libs/api"

export const shoppingCartService = {
    createShoppingCart(data: { productId: number, amount: number }) {
        return apiPost("/ShoppingCarts", {
            shoppingCarts: [{ ...data, shoppingCartId: null }]
        });
    },

    updateShoppingCart(data: { shoppingCartId: number, productId: number, amount: number }) {
        return apiPost(`/ShoppingCarts`, {
            shoppingCarts: [{ ...data }]
        });
    },

    clearShoppingCarts(data: { shoppingCartId: number, productId: number, amount: number }[]) {
        return apiPost(`/ShoppingCarts`, {
            shoppingCarts: data
        });
    },

    getShoppingCarts() {
        return apiGet("/ShoppingCarts");
    }
}