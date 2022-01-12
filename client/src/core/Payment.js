import React from 'react'
import Base from "./Base"
import TotalAndCart from './TotalAndCart'
import CartListHelper from './CartListHelper'
import StripeCheckout from 'react-stripe-checkout';
//import StripeCheckoutButton from "react-stripe-checkout";
import { total, list } from 'cart-localstorage'
import { isAutheticated } from '../auth/helper';
import { API } from '../backend';

import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'


const Payment = () => {

 const  opensweetalert=()=>{
      Swal.fire({
        title: 'THANKS FOR ORDER.................',
       
        type: 'success',
        
      })
}
  


   
    const history =useHistory()
    const goto=()=>{
        history.push('/')
    }
    const reDerict=()=>{
        setTimeout(() => {
            destroycart()
            goto()
        }, 3000);
    }
   


    const tokenn = isAutheticated() && isAutheticated().token;
    const userId = isAutheticated() && isAutheticated().user._id;
    const products =list()
   
    const destroycart=()=>{
        if (typeof window !== undefined) {
          localStorage.removeItem("__cart");
          let __cart = [];
          localStorage.setItem("__cart", JSON.stringify(__cart));
         
        }
        
       
      }
   // console.log(products)
const   getFinalAmount=()=>{
    return total()
}
  


const makePayment=(token)=>{
   // console.log(token, "payreact")
 const body ={
     token,
     products, 

 }
 const headers = {
    "Content-Type": "application/json"
  };
 return fetch(`${API}/makepayment`,{
      method:"POST",
      headers,
      body:JSON.stringify(body)
  })
  .then(response=>{
      return response.json()
    //   console.log(response, "font")
      
    //  const order={
    //     products:products,
    //     amount:100,
    //     transaction_id:response.id
        


    //  }
    // fetch(`${API}/order/create/${userId}`,{
    //     method: "POST",
    //     headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${tokenn}`
    //     },
    //     body:JSON.stringify({order})
    // })
    // .then(res=>{
    //     return res.json()
    // }).then(dat=>{
    //     console.log("dat")
    // })
    
    // .catch(err=>{console.log(err)})

      
  })
  .then(data=>{
      if(data.result.status==="succeeded"){
        const order={
            products:products,
            amount:data.result.amount,
            transaction_id:data.result.id
         }
        fetch(`${API}/order/create/${userId}`,{
            method: "POST",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenn}`
            },
            body:JSON.stringify({order})
        })
        .then(res=>{
            return res.json()
        }).then(dat=>{
            if (!dat.error) {
                opensweetalert()
                reDerict()
            }
        })
        .catch(err=>{console.log(err)})
      }
    })
  .catch(err=>console.log(err))

}



    return (
        <Base title="Payment">
        <div className="container">
        <div className="col-md-9">
            <CartListHelper/>
            <StripeCheckout
            token={makePayment}
            stripeKey="pk_test_51HVynCAVzGyDujmhaBVz6i7DKV6dqUwmzSQAqOgWXXxE2uw1fRSlXt3ITTk5Rn1qhhqVQgzjln651a6vrKMQ2Ze500RPtLMbwm"
            amount={getFinalAmount()}
            name="Buy Tshirts"
            shippingAddress
            billingAddress
            card
     />
     
        </div>
        <div className="col-md-3">
        <TotalAndCart/>
        </div>
        </div>
        <button className="text-white" onClick={opensweetalert}>Open Success Sweetalert Popup</button>
        </Base>
    )
}

export default Payment
