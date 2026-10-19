import { productService } from "@/services/product-service";
import ProductItemComponent from "./product-item";

export default async function ProductListComponent() {

    const response = await productService.getProducts();

    return (
        <div>
            {response.isSuccess && response.value.map((product) => (
                <ProductItemComponent
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    amount={product.amount}
                    price={product.price}
                />
            ))}
        </div>
    )

}