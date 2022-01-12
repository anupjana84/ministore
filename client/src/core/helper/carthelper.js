//import { add, get, total } from 'cart-localstorage' 




export const addItemToCart = (item, next) => {
    let cart = [];
   if(typeof window !==undefined){
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.push({
       ...item,
       count:1
        
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      next();
    }
   
  }

// export cardhe =()=>{
//     let cart=[];

// }
///cart simble count
export const cartItem=(kk)=>{
  
    var items= localStorage.getItem('__cart')
  
   var str =JSON.parse(items)
  
 if (str!== null) {
  if (str.length) {
    return str.length;
 }
   
 }
   
    
   return false;
    
   }

   export const loadCart = () => {
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        return JSON.parse(localStorage.getItem("cart"));
      }
    }
  };

  
