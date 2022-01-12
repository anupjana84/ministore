import React,{useState} from 'react'
import  Base from '../core/Base'
import { API } from "../backend";
import { Redirect } from 'react-router-dom'

import { Link } from 'react-router-dom'

import { isAutheticated } from '../auth/helper';

import {toast,ToastContainer } from 'react-toastify';

const Login=({
    title="Login Page",
   
})=> {
    const [values, setValues] = useState({
        
        email: "anup@gmail.com",
        password: "123456",
        error: "",
        success: false,
        jwtt:'',
        loading: false,
        didRedirect: false

      });
    
      const {email, password, error,didRedirect } = values;
      const errrorTosta=(error)=>{
        if(error){
        toast.error(`${error}`,{
            position: toast.POSITION.TOP_CENTER,
            progress: undefined,
          }, { autoClose: 5000 })
        }
        
    }
      const {user}=isAutheticated();
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
              password:password
          }
          fetch(`${API}/login`,{
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
           // console.log(data)
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
                localStorage.setItem('jwt',JSON.stringify(data))
                  setValues({
                      ...values,
                      error:false,
                      didRedirect:true,
                      success:true
                  })
              }
          })
          .catch(err=>{console.log(err)})

      }
      const performRedirect = () => {
        if (didRedirect) {
          if (user && user.role ===1) {
            return <Redirect to="/admin/dashboard"/>
          } else {
            if(JSON.parse(localStorage.getItem("__cart")).length>0){
              return <Redirect to="/cart"/>

            }else{
              return <Redirect to="/user/dashboard"/>

            }
            
          }
        }
        if (isAutheticated()) {
          return <Redirect to="/" />;
        }
      };
    
      const ErrorMessage=()=>{
        return(
            
                <div className="row text-center text-danger">
                  <div className="col-md-6 offset-3 ">
                      <div className="alert alert-danger"
                      style={{display:error ? "":"none"}}
                      >
                         {error}
                      </div>   
                  </div>
                </div>
            
        )
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
             
            <div className="form-group col-md-6 offset-3">
                <label  className="text-light">Password</label>
                <input type="password" 
                 className="form-control"
                 placeholder="Enter Your Password"
                 onChange={(e)=>{handelChange(e)}}
                 name="password"
                 value={password} 
                 />
            </div>   
            
            <div className="form-group d-flex  col-md-6 offset-3  justify-content-center">
                <button type="submit" className="btn btn-success">Login</button>
                
            </div>  
           
        </div>
        
    </form>


      )
    return (
        <Base title="Login ">
        <div className="container">
        <ToastContainer limit={1}/>
          {/* {ErrorMessage()} */}
           {LoginForm()}
      
          
           {performRedirect()}
           <div className="col-md-6 offset-3 d-flex form-group   justify-content-center align-items-center">
            <Link className="bg-info p-3 " to="forgotPsssword">Forgot Your Password ?</Link>  
        </div> 
        </div>
        </Base>
    )
}
export default Login;