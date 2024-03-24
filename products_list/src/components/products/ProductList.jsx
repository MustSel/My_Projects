import ProductCard from "./ProductCard";
import "./Products.scss"

const ProductList = ({products}) => {
    console.log(products)
    
    return(
        <div className="products-list">
            {
                products.map((product)=>(
                   <ProductCard key={product.id} product={product} />
                ))
            }
        </div>
    )
}

export default ProductList;