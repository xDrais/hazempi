import "./product.css"
function Product(){
    return(
  
    <div className="containerproduit">
  <div className="overlay" draggable="false">
    <div className = "items"></div>
    <div className = "items head">
      <p>Flower Embroidery Hoop Art</p>
    </div><hr />
    <div className = "items price">
      <p className="old">$699</p>
      <p className="new">$345</p>
    </div>
    <div className="items cart">
  </div>
</div>
</div> 
   )

}
export default Product;