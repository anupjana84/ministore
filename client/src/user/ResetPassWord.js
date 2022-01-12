import React,{useState} from 'react'
import  Base from '../core/Base'
import { API } from "../backend";
import {useParams } from 'react-router-dom'





import {toast,ToastContainer } from 'react-toastify';

const ResetPassWord=({
    title="Login Page",
   
})=> {


  const {resetToken}=useParams()
  //console.log(resetToken)

    const [values, setValues] = useState({
        
       
      password: "",
        error: "",
        success: false,
        jwtt:'',
        loading: false,
        didRedirect: false

      });
    
      const { password} = values;


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


      
      const handelChange=(e)=>{
        setValues({
            ...values,
            [e.target.name]:e.target.value
        })
          
      }
      const login=(e)=>{
        console.log(password)
          e.preventDefault();
          setValues({
            ...values,
            error:false, success:false
          })
         
          fetch(`${API}/resetPassword`,{
              method:"POST",
              headers:{
                  Accept:"application/json",
                  "content-Type":"application/json"
              },
              body:JSON.stringify({resetToken,password})
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
               
                  setValues({
                      ...values,
                      error:false,
                      didRedirect:true,
                      success:true
                  })
                 // console.log(data)
                  sussessTosta(data.message)
              }
          })
          .catch(err=>{console.log(err)})

      }
      // const performRedirect = () => {
      //   if (didRedirect) {
      //     if (user && user.role ===1) {
      //       return <Redirect to="/admin/dashboard"/>
      //     } else {
      //       return <Redirect to="/user/dashboard"/>
      //     }
      //   }
      //   if (isAutheticated()) {
      //     return <Redirect to="/" />;
      //   }
      // };
    
     
   
      const LoginForm=()=>(
        <form className="py-5" onSubmit={login} >
        <div className="row">
              
           
             
            <div className="form-group col-md-6 offset-3">
                <label  className="text-light"> New Password</label>
                <input type="password" 
                 className="form-control"
                 placeholder="Enter New Password"
                 onChange={(e)=>{handelChange(e)}}
                 name="password"
                 value={password} 
                 />
            </div>   
            
            <div className="form-group d-flex  col-md-6 offset-3  justify-content-center">
                <button type="submit" className="btn btn-success">Update Password</button>
                
            </div>  
           
        </div>
        
    </form>


      )
    return (
        <Base title="Reset PassWord Form">
        <ToastContainer limit={1}/>
          {/* {ErrorMessage()} */}
           {LoginForm()}
      
          
           {/* {performRedirect()} */}
           
        </Base>
    )
}
export default ResetPassWord;