import Product from "../../Components/product/product";
import "./shop.css"
import React, {useState,useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from "../../productredux/productaction";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import backg from "./backg.jpg";
import axios from "axios";


function Shop()
{ 

    const dispatch = useDispatch();
    const products = useSelector((state) => state.productGetReducer.products);
    const [bestSeller, setBestSeller] = useState(null);
    const best = bestSeller
    ?.slice(0, 3);

  
    console.log("ena el products" + products);
    useEffect(() => {
      dispatch(getProducts());
    }, [dispatch ]);
    console.log("ena el products" + Array.isArray(products) );


    useEffect(() => {
      async function fetchBestSeller() {
        try {
          const response = await axios.get('http://localhost:5000/api/orders/best/seller');
          setBestSeller(response.data);
        } catch (error) {
          console.error(error);
        }
      }
      fetchBestSeller();
    }, []);


   
   const handleRefresh = () => {
     setTimeout(() => {
       dispatch(getProducts());
     }, 1000); 
     console.log("after 1 second");// Refresh after 1 seconds (adjust the number as needed)
   };

    return (
        <> <body style={{backgroundImage:`url(${backg})`,height:"1900px"}}>
         {/* <Carousel style={{marginTop:"100px",maxLength:"300px"}} pause='hover' className='bg-light'>
         {Array.isArray(products) && products.map((p) => (
        <Carousel.Item key={p._id}>
          <Link to={`/productDetail/${p._id}`}>
            <Image src={`${process.env.PUBLIC_URL}/images/${p.imageProduct}`} alt={p.productName} fluid />
          </Link>
        </Carousel.Item>  
      ))}
    </Carousel> */} 
    <div style={{marginBottom:"-130px",color:"beige"}}><h1 style={{color:"white"}}className="SectionTitle">Products</h1>
            <p style={{color:"white"}} className="paragraph2">our Best Seller </p></div> 
            
        <div className="shopcontainer">
        {Array.isArray(best) && best.map((p) => (
          <Product product={p} >

          </Product>
        ))}
        
        </div>
    
    
     <div style={{marginBottom:"-130px",color:"beige"}}><h1 style={{color:"white"}}className="SectionTitle">Products</h1>
            <p style={{color:"white"}} className="paragraph2">our students' hand-made products </p></div> 
            
        <div className="shopcontainer">
        {Array.isArray(products) && products.map((p) => (
          <Product product={p} >

          </Product>
        ))}
        
        </div>
        </body>  </>
    )
}
export default Shop;