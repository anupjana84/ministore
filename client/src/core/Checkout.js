import React,{useState, Fragment} from 'react'
import Base from './Base'
import { toast,ToastContainer } from 'react-toastify';
import { API } from '../backend';
import { isAutheticated,checkout } from '../auth/helper';
import { Link ,Redirect } from 'react-router-dom'
import CartListHelper from './CartListHelper';

import TotalAndCart from './TotalAndCart';

const Checkout=({
    title="Login Page",
   
})=> {
    const [values, setValues] = useState({
        
        email: "",
        password: "",
        error: "",
        name:"",
        success: false,
        jwtt:'',
        loading: false,
        didRedirect: false

      });
    
      const {email, password,name } = values;
      const errrorTosta=(error)=>{
        if(error){
        toast.error(`${error}`,{
            position: toast.POSITION.TOP_CENTER,
            progress: undefined,
          }, { autoClose: 5000 })
        }
        
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
              password:password
          }
         // console.log(datafrom)
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
         //   console.log(data)
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


      const singUp=(e)=>{
          e.preventDefault();
          setValues({
            ...values,
            error:false, success:false
          })
          const datafrom ={
            name:name,
              email:email,
              password:password
          }
         // console.log(datafrom)
          fetch(`${API}/customersave`,{
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
            console.log(data)
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
      // const performRedirect = () => {
      //   if (didRedirect) {
      //     if (user && user.role ===1) {
      //       return <Redirect to="/admin/dashboard"/>
      //     } else {
      //       if(JSON.parse(localStorage.getItem("__cart")).length>0){
      //         return <Redirect to="/cart"/>

      //       }else{
      //         return <Redirect to="/user/dashboard"/>

      //       }
            
      //     }
      //   }
      //   if (isAutheticated()) {
      //     return <Redirect to="/" />;
      //   }
      // };
    
      
   
      const LoginForm=()=>(
        <form  id="demo"  >
            <div className="form-group col-md-6 offset-3  ">
                <label className="text-white">Email</label>
                <input type="email" 
                 className="form-control" 
                 placeholder="Enter Your Email"
                 onChange={(e)=>{handelChange(e)}}
                 name="email"
                 value={email}
                  />
            </div>   
            <div className="form-group col-md-6 offset-3  ">
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
                <button type="submit" className="btn btn-success" onClick={login}>Login</button> 
        </div>
    </form>


      )
      const SingUpForm=()=>(
        <form id="demo2" onSubmit={singUp}>
            <div className="form-group col-md-6 offset-3 ">
                <label className="text-white">Name</label>
                <input type="text" 
                 className="form-control" 
                 placeholder="Enter Your Name"
                 onChange={(e)=>{handelChange(e)}}
                 name="name"
                 value={name}
                  />
            </div>   
            <div className="form-group offset-3  col-md-6 ">
                <label className="text-white">Email</label>
                <input type="email" 
                 className="form-control" 
                 placeholder="Enter Your Email"
                 onChange={(e)=>{handelChange(e)}}
                 name="email"
                 value={email}
                  />
            </div>   
            <div className="form-group offset-3  col-md-6  ">
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
                <button type="submit" className="btn btn-success mb-3" >Sing Up</button> 
        </div>
    </form>


      )
const cheoutRedirect=()=>{
  if(isAutheticated() && checkout().length>0){
    return <Redirect to="/shipping"/>
  }else{
    return (
        <Fragment>
      <div className="container">
        <ToastContainer limit={1}/>
        
          
        
          <div >
           
          </div>
      
          
           {/* {performRedirect()} */}
           
        </div>
      



<div className="container">
<div className="row">
<div className="col-md-9">

<div class="accordion" id="accordionExample1">
  <div class="card z-depth-0 bordered">
    <div class="card-header" id="headingOne" style={{backgroundColor:"#2874f0"}}>
      <h5 class="mb-0"
        type="button" data-toggle="collapse" data-target="#collapseOne"
          aria-expanded="true" aria-controls="collapseOne"  style={{color:"#ffffff"}}>Order Summary
      </h5>
    </div>
    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne"
      data-parent="#accordionExample1">
      <div class="card-body">
      <CartListHelper/>
      </div>
    </div>
  </div>
  <div class="card z-depth-0 bordered">
    <div class="card-header" id="headingTwo" style={{backgroundColor:"#2874f0"}}>
      <h5 class="mb-0  d-flex justify-content-between
         collapsed" type="button" data-toggle="collapse"
          data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" style={{color:"#ffffff"}}>
          Sing Up
          {isAutheticated() && isAutheticated().user._id ? (<span style={{color:"white"}}><i class="fa fa-check" aria-hidden="true"></i></span>):
      (<span style={{color:"white"}}><i class="fa fa-times" aria-hidden="true"></i></span>)}  
      </h5>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample1">
      <div class="card-body">
      {SingUpForm()}
      </div>
    </div>
  </div>
  <div class="card z-depth-0 bordered">
    <div class="card-header" id="headingThree" style={{backgroundColor:"#2874f0"}}>
      <h5 class="mb-0 collapsed d-flex justify-content-between" type="button" data-toggle="collapse"
          data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" style={{color:"#ffffff"}}>
        Login
      {isAutheticated() && isAutheticated().user._id ? (<span style={{color:"white"}}><i class="fa fa-check" aria-hidden="true"></i></span>):
      (<span style={{color:"white"}}><i class="fa fa-times" aria-hidden="true"></i></span>)}  
        
      </h5>
    </div>
    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample1">
      <div class="card-body">
      {LoginForm()}
      <div className=" d-flex form-group   justify-content-center align-items-center">
                            <Link className="bg-info p-2 mt-4 " to="forgotPsssword">Forgot Your Password ?</Link>  
        </div>
      </div>
    </div>
  </div>
</div>
    </div>   
    </div>
    <div className="col-md-3">
    <TotalAndCart/>
    </div>
    </div>
     </Fragment>
    )
  }
  
}


    return (
        <Base title=" Check Out ">
        {cheoutRedirect()}
        </Base>
    )
}
export default Checkout;