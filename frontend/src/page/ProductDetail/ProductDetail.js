import "./ProductDetail.css"

function ProductDetail(){
    return (
        <><body className="bodydetail">
        <div class="container1">
  <div class="images">
    <img className="imgdetail" src="http://mistillas.cl/wp-content/uploads/2018/04/Nike-Epic-React-Flyknit-%E2%80%9CPearl-Pink%E2%80%9D-01.jpg" />
  </div>
  <div class="slideshow-buttons">
    <div class="one"></div>
    <div class="two"></div>
    <div class="three"></div>
    <div class="four"></div>
  </div>
  <p class="pick pdetail">choose size</p>
  <div class="sizes">
    <div class="size">5</div>
    <div class="size">6</div>
    <div class="size">7</div>
    <div class="size">8</div>
    <div class="size">9</div>
    <div class="size">10</div>
    <div class="size">11</div>
    <div class="size">12</div>
  </div>
  <div class="product">
    <p className="pdetail">Women's Running Shoe</p>
    <h1 className="h1detail">Nike Epic React Flyknit</h1>
    <h2 className="h2detail">$150</h2>
    <p class="desc pdetail">The Nike Epic React Flyknit foam cushioning is responsive yet light-weight, durable yet soft. This creates a sensation that not only enhances the feeling of moving forward, but makes running feel fun, too.</p>
    <div class="buttons">
      <button class="add">Add to Cart</button>
      <button class="like"><span>♥</span></button>
    </div>
  </div>
</div>

</body>  </>
    )
}
export default ProductDetail;