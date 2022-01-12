import { API } from "../../backend"





export const createProduct=(product)=>{
   return fetch(`${API}/create/product`,{
        method:"POST",
        headers:{
            Accept:"application/json"
        },
        body:product

    })
  
    .then(res=>{
        return res.json()
    })
    .catch(err=>{
        console.log(err)
    })
}