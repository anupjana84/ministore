import { API } from "../../backend";

 export const createOrder =(userId, token, orderData)=>{
 
    return fetch(`${API}/order/creat/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({order:orderData})
    })
    .the(res=>{
        return res.json()
    }).catch(err=>{console.log(err)})
}