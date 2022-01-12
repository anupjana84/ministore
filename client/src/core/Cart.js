import React,{useEffect,useState} from 'react'
import Base from './Base'
//import { loadCart } from './helper/carthelper'
//import ImageHelperCart from './ImageHelperCart'
import { list } from 'cart-localstorage'
import CardForCart from './CardForCart'


const Cart = () => {
  
const [products, setProduct] = useState([])
const [image, setImage]=useState("")
const [reload, setReload] = useState(false)





useEffect(() => {
 (setProduct(list())) 

 
}, [reload])



    return (
        <Base title="Cart">
       <div className="container">
      <CardForCart
        setReload={setReload}
        reload={reload}
        products={products}/>
        </div>
        </Base>
    )
}

export default Cart
