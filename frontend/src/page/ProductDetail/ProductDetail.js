import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductDetail.css"
import { getProducts, productDetails } from "../../productredux/productaction";
import { useParams } from "react-router-dom";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;


const ProductDetail=({match})=>{
    const dispatch = useDispatch();
      const products = useSelector((state) => state.productGetReducer.products);
      const { id } = useParams();

    console.log("ena el products" + products);
    useEffect(() => {
      dispatch(getProducts());
    }, [dispatch ]);
    console.table(products)
    const product = products.find((p) => p._id === id);
console.table(product);
console.log(id);
    return (
        <>
         {product ? (<body className="bodydetail">
        <div class="container1">
  <div class="images">
  <img className="imgdetail" src={`${process.env.PUBLIC_URL}/images/${product.imageProduct}`} />
  </div>
  <div class="slideshow-buttons">
    <div class="one"></div>
    <div class="two"></div>
    <div class="three"></div>
    <div class="four"></div>
  </div>
  {/* <p class="pick pdetail">choose size</p>
  <div class="sizes">
    <div class="size">5</div>
    <div class="size">6</div>
    <div class="size">7</div>
    <div class="size">8</div>
    <div class="size">9</div>
    <div class="size">10</div>
    <div class="size">11</div>
    <div class="size">12</div>
  </div> */}
  <div class="product1"> 
    <p className="pdetail"> {product.category}- by {product?.user?.firstName} {product?.user?.lastName}</p>
    <h1 className="h1detail">{product.productName}</h1>
    <h2 className="h2detail">{product.price} Dt </h2>
    <p class="desc pdetail">{product.description}.</p>
    <div class="buttons">
      <button class="add">Add to Cart</button>
      <button class="like"><span>♥</span></button>
    </div>
  </div>
</div>

</body>  ) : (
        <p>No product found</p>
      )} </>
    )
}
export default ProductDetail;