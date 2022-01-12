import React, {useState} from 'react'
import { toast,ToastContainer } from 'react-toastify';





import Base  from '../core/Base'
import { useHistory } from 'react-router-dom'

const Register=()=>{
  const history =useHistory()
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
      });
    
      const { name, email, password } = values;

      const errrorTosta=(error)=>{
        if(error){
        toast.error(`${error}`,{
            position: toast.POSITION.TOP_CENTER,
            progress: undefined,
          }, { autoClose: 3000 })
        }
        
    }
      const successTosta=(error)=>{
        if(error){
        toast.success(`${error}`,{
            position: toast.POSITION.TOP_CENTER,
            progress: undefined,
          }, { autoClose: 3000 })
        }
        
    }
      const handelChange=(e)=>{
          setValues({
            ...values,
            [e.target.name]:e.target.value

          })
          //console.log(password)
      }
      const formSubmit=(e)=>{
         const dataone={
             name:name,
             email:email,
             password:password
         }
        e.preventDefault();
          setValues({ ...values, error: false });
          fetch(`/register`,{
              method:"POST",
              headers:{
                  Accept:"application/json",
                  "Content-Type":"application/json"
              },
              body:JSON.stringify(dataone)
          })
          .then(result=>{
           return result.json()
          })
          .then(data=>{
             if(data.error){
                setValues({ ...values, error: data.error, success:false });
                errrorTosta(data.error)
             }else{
                setValues({
                    ...values,
                    name: "",
                    email: "",
                    password: "",
                    error: "",
                    success: true
                  });
                  successTosta("Registration Successfull")
                  goTo()
             }
            
          }

          )
          .catch(err=>{
              console.log(err)
          }
            )
         // console.log(name, email, password)

      }
     const goTo=()=>{
       setTimeout(() => {
        history.push("/login")
       }, 3000);
     }
     
    return (
        <Base  title="Register Page">
       <ToastContainer limit={1}/>
      
        <form className="py-5" onSubmit={formSubmit}>
        <div className="row">
            <div className="form-group col-md-6 offset-3">
                <label  className="text-white">Name</label>
                <input type="text" 
                 className="form-control" 
                 placeholder="Enter Your Name"
                 onChange={(e)=>handelChange(e)}
                 name="name"
                 value={name}

                 />
            </div>   
            <div className="form-group col-md-6 offset-3">
                <label className="text-white">Email</label>
                <input type="email" 
                 className="form-control" 
                 placeholder="Enter Your Email"
                 onChange={(e)=>handelChange(e)}
                 name="email"
                 value={email}


                  />
            </div>   
             
            <div className="form-group col-md-6 offset-3">
                <label  className="text-light">Password</label>
                <input type="password" 
                 className="form-control"
                 placeholder="Enter Your Password"
                 onChange={(e)=>handelChange(e)}
                 name="password"
                 value={password} 
                 />
            </div>   
            
            <div className="form-group d-flex  col-md-6 offset-3 justify-content-center">
                <button type="submit" class="btn btn-success">Register</button>
            </div>   
        </div>
    </form>
</Base>
    )
}
export default Register