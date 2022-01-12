import React,{ useState} from 'react'
import ImageHelperHome from './ImageHelperHome';
import { Link, Redirect } from 'react-router-dom'

//import { API } from '../backend';
import { add } from 'cart-localstorage'


const Card=({product})=> {

    const [direct, setRedirect] = useState(false);

//    const addedcart=(product)=>{
//     let exitkey=JSON.parse(localStorage.getItem('getitems'))
//     if (exitkey == null) {
//        exitkey=[]
        
    
//     exitkey.push(product)
//     localStorage.setItem("getitems",JSON.stringify(exitkey))
        
//     }else{
       
//     let exitkey = JSON.parse(localStorage.getItem('getitems'))
  
//          if(exitkey.some(poo=>poo._id ==product._id)){
//             return false
//          }else{
//              exitkey.push(product)
//             localStorage.setItem("getitems",JSON.stringify(exitkey))
//          } 
//     }
//    }
//   const opppra=(product)=>{
//       console.log(product)
//     let onecart=JSON.parse(localStorage.getItem("getitems"))
//     let oneObc =onecart.find(product=>product)
//     console.log(oneObc)
//   }
  
const addCart=(product)=>{

    add(
        {id: product._id, name:product.name , price: product.price,photo:product.photo})
        setRedirect(true)

}
const getRedirec=(direct)=>{
    if (direct) {
        
        return <Redirect to="/cart"/>
    }

}


    return (
        <div className="col-md-4">
     
           
            <div className="card mb-4 shadow-sm">
            {getRedirec(direct)}
            <p className="card-text text-center">{product.name}</p>
               <ImageHelperHome product={product}/>
                <div className="card-body text-center">
                        
                        <p className="card-text">{product.description}</p>
                        <small className="text-muted" style={{fontSize:"16px"}}>
                        <span className="mr-1"><i className="fa fa-inr" aria-hidden="true"></i></span>{product.price}</small>
                    <div className="d-flex justify-content-center ">
                    <button onClick={()=>{addCart(product)}}>Add To Cart</button>
                    
                    <Link type="button" className="btn btn-sm btn-outline-success" to={`/single/product/${product._id}`}>View Product</Link>
                  
                 
                </div>
                </div>
            </div>
        </div>
    )
}
export default Card;