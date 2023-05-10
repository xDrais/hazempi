import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { VictoryPie } from 'victory';
import confetti from "https://esm.run/canvas-confetti@1";

function OrdersStat() {
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo } = userLogin

    const [bestSeller, setBestSeller] = useState(null);
    const [product, setProduct] = useState([]);
    const [productf, setProductf] = useState(true);

    const getProduct = async () => {
        try {
          const response = await fetch(`http://localhost:5000/product/productById/${userInfo._id}`, { method: 'GET' });
          const data = await response.json();
          setProduct(data);
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      };
      //getcourse

      useEffect(() => {
        getProduct();
        console.log(product);
        setProductf(false)
        //getcourse()
      }, [userInfo._id,productf]);

    useEffect(() => {
        async function fetchBestSeller() {
          try {
            const response = await axios.post('http://localhost:5000/api/orders/bestSpecific',product);
            console.log("respojse/////////////////");
            setProductf(true)

            console.log(response);
            const formattedResponse = response.data.map(product => ({ name: product.productName, sales: product.count }));
            setBestSeller(formattedResponse);
            
            console.log("/////////////////");

            console.log(formattedResponse.name);
          } catch (error) {
            console.error(error);
          }
        } 
        fetchBestSeller();
      }, [userInfo._id,productf]);
      const color = '#b58770'; // set the color to be used for the chart

  return (
    <div>
      <h2 style={{color:"white"}}> Your Personal Best Sellers</h2>
      <div style={{display:'flex'}}>
   
      {bestSeller && bestSeller.map((seller, index) => (
        <div key={index}>
          <h3>{seller.name}</h3>
          <VictoryPie
  data={[{ x: `number of orders: ${seller.sales}`, y: seller.sales }]}
  colorScale={[color]} // set the colorScale prop with an array containing only the desired color
/>        </div> 
      ))}
    </div> </div> )
}

export default OrdersStat