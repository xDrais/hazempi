import "./product.css"
function Product({product}){
    return(
  
      <div className="containerproduit" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/${product.imageProduct})`}}>
  <div className="overlay" draggable="false">
    <div className = "items">{product.productName}</div>
    <div className = "items head">
      <p>{product.description}</p>
    </div><hr />
    <div className = "items price">
      <p className="new">{product.price} DT</p>
    </div>
    <div className="items cart">
       <span href= "/yo">   ADD TO CART</span>
  </div>
</div>
</div> 
   )

}
export default Product;