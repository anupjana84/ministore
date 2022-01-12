import React, { Fragment } from 'react'
import { remove,  total, quantity} from 'cart-localstorage'
import { Link } from 'react-router-dom'

//import StripeCheckout from 'react-stripe-checkout';
const CardForCart = ({
    products,
    reload=undefined,
    setReload=f=>f



}) => {
    


const updateCart=(id,num)=>{
   // update(id,price, valu)
    quantity(`${id}`,num)
    setReload(!reload)
    
    
    
} 

const destroycart=()=>{
  if (typeof window !== undefined) {
    localStorage.removeItem("__cart");
    let __cart = [];
    localStorage.setItem("__cart", JSON.stringify(__cart));
    
  }
  setReload(!reload)
}


const reMoveFormCart=(id)=>{
    remove(id)
    setReload(!reload)
}




    return (
        <Fragment>
        {/* {destroydisable()} */}
        <div className="table-responsive cart_info">
  <table className="table table-condensed bg-white">
    <thead>
      <tr className="cart_menu">
        <td className="image text-center">image</td>
        <td className="image text-center">Name</td>
        <td className="price text-center">Price</td>
        <td className="price text-center">Update</td>
        <td className="quantity text-center">Quantity</td>
        <td className="total text-center">Total Price</td>
        <td className="total text-center">Action</td>
      </tr>
    </thead>
    <tbody>
  
    { products && (products.map((product,i)=>{
            return(
             <tr key={i}>
               <td className="cart_product text-center">
               {/* <ImageHelperCart products={products.photo}/> */}
               <div className="border-info" style={{width:"100px", height:"100px"}}>
             <img
               src={product.photo}
               alt='React'
               style={{ maxHeight: "100%", maxWidth: "100%" }}
               className="rounded"
             />
             
           </div>
               </td>
               <td className="cart_description text-center">
                 <h4>{product.name}</h4>
               </td>
               <td className="cart_price text-center">
                 <h5>{product.price}</h5>
               </td>
               <td className="cart_quantity text-center">
                 <div className="cart_quantity_button">
                   <button className="btn btn-info mr-1" onClick={()=>{updateCart(product.id,1)}}><i className="fa fa-plus" aria-hidden="true">

                   </i></button>
                   <button className="btn btn-success ml-1" >
                   {product.quantity}</button>

                   <button className="btn btn-danger ml-1" disabled={product.quantity==1} onClick={()=>{updateCart(product.id,-1)}}>
                   <i className="fa fa-minus" aria-hidden="true"></i></button>
                 
                 </div>
               </td>
               <td className="cart_total text-center">
                 <p >{product.quantity}</p>
               </td>
               <td className="cart_delete text-center">
               
                 <span className="cart_quantity_delete" id="pricess" > {product.price*product.quantity}</span>
               </td>
               <td className="cart_delete text-center">
                 <span className="cart_quantity_delete" onClick={()=>reMoveFormCart(product.id)}>
               <i className="fa fa-times" /></span>
               </td>
             </tr>
            )
          }))}
    
    </tbody>
  </table>

 <div className="col-sm-12 bg-white p-3">
  <div className="total_area">
    <ul >
      <li style={{backgroundColor:"#e6e4df"}} className="d-flex  justify-content-between my-1 p-2"> 
      <span>Cart Sub Total</span> <span className="ml-auto">00</span></li>
      <li style={{backgroundColor:"#e6e4df"}}  className="d-flex  justify-content-between my-1 p-2 ">
      <span>Eco Tax</span> <span>00</span></li>
      <li style={{backgroundColor:"#e6e4df"}}  className="d-flex  justify-content-between my-1 p-2 ">
      Shipping Cost <span>00</span></li>
      <li style={{backgroundColor:"#e6e4df"}}  className="d-flex  justify-content-between my-1 p-2">
      <h4>Total</h4>
      <h4 ><span className="mr-1"><i className="fa fa-inr" aria-hidden="true"></i></span>{total()}</h4>
      </li>
    </ul>
          <div className="d-flex justify-content-between">
 
   <span className="btn btn-danger update"  onClick={destroycart} >Remove Cart</span>
   
    
    <Link className="btn btn-success check_out" to="/checkout"> Check Out</Link>
    </div>
  </div>
</div>

</div>

          </Fragment>
    )
}

export default CardForCart;
