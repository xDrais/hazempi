import Product from "../product/product"
import background from "./backgrounDd.png"
import "./products.css"
import "../section1/section1.css"
function Products(){
    
     return(
        <>
        <div className="products">
<h1 align="center" className="SectionTitle-light">BEST SELLERS</h1>
            <p  align="center" className="paragraph2-light">Explore our variety of products</p> 
            <div className="listofproducts Aboutus">
                

<Product />
<Product />
<Product />
<Product />
</div>
        </div> 
        </>
     )
}
export default Products;