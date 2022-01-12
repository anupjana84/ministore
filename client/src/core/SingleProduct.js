import React,{useEffect, useState} from 'react'

import Base from './Base'
import { API } from '../backend'
import ImageHelperHome from './ImageHelperHome'
import { addItemToCart } from './helper/carthelper'
import { Redirect } from 'react-router-dom'



const SingleProduct = ({match}) => {
    
    const productId =match.params.productId;
    const [redirect, setRedirect] = useState(false);
   

const [singproduct, setProduct] = useState("")


    const {name, description,price}=singproduct;
    const addTocart=()=>{
        addItemToCart(singproduct,()=>setRedirect(true))
    }

    const getRedirec=()=>{
        if (redirect) {
            return <Redirect to="/cart"/>
            
        }

    }
    const getProduct =()=>{

       fetch(`${API}/single/product/${productId}`,{
           method:"GET",
    
       })
       .then(res=>{
          return  res.json();
       })
       .then(data=>{
           setProduct(data
           )
          console.log(data)
       })
       .catch(err=>{
           console.log(err)
       })
    }
    useEffect(() => {
        getProduct();
    }, [])






    return (
        <Base title="Single Product">
        <div className="container bg-white my-5">
            <div className="row">
                {getRedirec()}
                <div className="col-md-4">
                    
                    <ImageHelperHome product={singproduct}/>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-info my-3" onClick={addTocart}>Add To Cart</button>
                    </div>
                </div>
                <div className="col-md-8">
                <h1 className="text-center">{name}</h1>
                    <h1 className="text-center"><i className="fa fa-inr" aria-hidden="true"></i>{price}</h1>
                    <h4 className=" text-center">{description}</h4>
                </div>
            </div>
        </div>
            
        </Base>
    )
}

export default SingleProduct
