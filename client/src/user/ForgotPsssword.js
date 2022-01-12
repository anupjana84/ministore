import React,{useState} from 'react'
import  Base from '../core/Base'
import { API } from "../backend";
//import { Redirect } from 'react-router-dom'
//import { isAutheticated } from '../auth/helper';

import {toast,ToastContainer } from 'react-toastify';

const ForgotPsssword=({
    title="Login Page",
   
})=> {
    const [values, setValues] = useState({
        
        email: "",
        password: "123456",
        error: "",
        success: false,
        jwtt:'',
        loading: false,
        didRedirect: false

      });
    
      const {email } = values;
      const errrorTosta=(error)=>{
        if(error){
        toast.error(`${error}`,{
            position: toast.POSITION.TOP_CENTER,
            progress: undefined,
          }, { autoClose: 5000 })
        }
        
    }
    const sussessTosta=(data)=>{
        
      toast.success(`${data}`,{
          position: toast.POSITION.TOP_CENTER,
          progress: undefined,
        }, { autoClose: 5000 })
      
      
  }
     // const {user}=isAutheticated();
      const handelChange=(e)=>{
        setValues({
            ...values,
            [e.target.name]:e.target.value
        })
          
      }
      const login=(e)=>{
          e.preventDefault();
          setValues({
            ...values,
            error:false, success:false
          })
          const datafrom ={
              email:email,
             
          }
          fetch(`${API}/forgotpassword`,{
              method:"POST",
              headers:{
                  Accept:"application/json",
                  "content-Type":"application/json"
              },
              body:JSON.stringify(datafrom)
          })
          .then(result=>{
              return result.json()
          })
          .then(data=>{
            //console.log(data)
         //   console.log(JSON.stringify(data.user))
              if(data.error){
                setValues({
                    ...values,
                    error:data.error,
                    success:false
                })
                errrorTosta(data.error)
               // console.log(data.error)
              }else{
                
                  setValues({
                      ...values,
                      email:"",
                      error:false,
                      didRedirect:true,
                      success:true
                  })
                 // console.log(object)
                  sussessTosta(data.message)
              }
          })
          .catch(err=>{console.log(err)})

      }
     
    
     
   
      const LoginForm=()=>(
        <form className="py-5" onSubmit={login} >
        <div className="row">
              
            <div className="form-group col-md-6 offset-3">
                <label className="text-white">Email</label>
                <input type="email" 
                 className="form-control" 
                 placeholder="Enter Your Email"
                 onChange={(e)=>{handelChange(e)}}
                 name="email"
                 value={email}
                  />
            </div>   
             
           
            
            <div className="form-group d-flex  col-md-6 offset-3  justify-content-center">
                <button type="submit" className="btn btn-success">Send</button>
                
            </div>  
           
        </div>
        
    </form>


      )
    return (
        <Base title="Forgot Passworg ">
        <ToastContainer limit={1}/>
          {/* {ErrorMessage()} */}
           {LoginForm()}
      
          
           {/* {performRedirect()} */}
          
        </Base>
    )
}
export default ForgotPsssword;