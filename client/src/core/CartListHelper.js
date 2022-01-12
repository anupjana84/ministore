import React, { Fragment} from 'react'
import { list } from 'cart-localstorage'
//import { Link } from 'react-router-dom'

//import StripeCheckout from 'react-stripe-checkout';
const CartListHelper = ({
    products,
    reload=undefined,
    setReload=f=>f



}) => {
    
//const[itemTotalPrice, setitemTotalPrice]=useState("")
//const [disable ,setDisable]=useState(true)

// const updateCart=(id,num)=>{
//    // update(id,price, valu)
//     quantity(`${id}`,num)
//     setReload(!reload)
    
    
    
// } 





    return (
        <Fragment>
        {/* {destroydisable()} */}
       
           
           
            
                
  <table className="table table-condensed bg-white" >
    <thead>
      <tr className="cart_menu">
        <td className="image text-center">image</td>
        <td className="image text-center">Name</td>
        <td className="price text-center">Price</td>
     
        <td className="quantity text-center">Quantity</td>
        <td className="total text-center">Total Price</td>
      
      </tr>
    </thead>
    <tbody>
  
    { list() && (list().map((product,i)=>{
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
               
               <td className="cart_total text-center">
                 <p >{product.quantity}</p>
               </td>
               <td className="cart_delete text-center">
               
                 <span className="cart_quantity_delete" id="pricess" > {product.price*product.quantity}</span>
               </td>
              
             </tr>
            )
          }))}
    
    </tbody>
  </table>
  

            
            <div className="col-md-3  overflow-hidden">
 
</div>

   
      
     
          </Fragment>
    )
}

export default CartListHelper;
