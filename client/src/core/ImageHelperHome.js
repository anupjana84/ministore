//import { API } from "../backend";

import React from 'react'

const ImageHelperHome = ({ product }) => {
//console.log(product,"product")
  
  const imageurl = product
    ? `${product.photo}`
    : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
  return (
    <div className="rounded border border-success p-2">
      <img
        src={imageurl}
        alt=""
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb-3 rounded"
      />
    </div>
  );
};

export default ImageHelperHome;
