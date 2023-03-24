import { Link } from "react-router-dom";
import "./product.css"
function Product({product}){
    return(
      <Link to={`/productdetail/${product._id}`} key={product._id} >

      <div align="center" className="containerproduit" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/${product.imageProduct})`}}>
  <div className="overlay" draggable="false">
    <div className = "items">{product.category}</div>
    <div className = "items head">
      <p>{product.productName}</p>
    </div><hr />
    <div className = "items price">
      <p className="new">{product.price} DT</p>
    </div>
    <div className="items cart">

  </div>
</div>
</div>      </Link>

   )

}
export default Product;