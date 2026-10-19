import { apiGet } from "@/libs/api"
import { BaseResponseDto } from "@/types/default-type";
import { ProductDto } from "@/types/product-type";

export const productService = {
    getProducts() {
        return apiGet<BaseResponseDto<ProductDto[]>>("/Products");
    }
}