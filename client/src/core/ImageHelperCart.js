//import { API } from "../backend";
import React from 'react'


const ImageHelperCart=(products)=> {

console.log(products)
    const imageurl =products
    ? `products`
    : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
  return (
    <div className="border-info" style={{width:"100px", height:"100px"}}>
      <img
        src={imageurl}
        alt='React'
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="rounded"
      />
      
    </div>
 );
}
export default  ImageHelperCart