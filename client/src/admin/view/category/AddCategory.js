import React,{useState} from 'react'

import AdminDashboard from '../../layout/AdminDashboard';

import { isAutheticated } from '../../../auth/helper';
import { API } from '../../../backend';

import {  toast } from 'react-toastify';
import { errorMessage, successMessage } from '../../../utility';





toast.configure();
const AddCategory = () => {
    const [values, setValues]=useState({
        title:"",
        description:"",
        error:false,
        success:false,
        errortos:false
    })
    const {title,description,error}=values
    const {user , token}=isAutheticated();
  
     

    const  handelChange=(e)=>{
        
        setValues({
            ...values,
        [e.target.name]:e.target.value

        })
    }
    const   addSubmit=(e)=>{
        e.preventDefault();
        setValues({
            ...values,
            errortos:false
        })
        const data={
            title:title,
            description:description
        }
        fetch(`${API}/admin/add/category/${user._id}`,{
            method:"POST",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify(data)


        })
        .then(result=>{
            return result.json()
        })
        .then(data=>{
          if(data.error){
              setValues({
                ...values,
                error:data.error,
                success:false,
                
              })
              errorMessage(data.error)
          }else{
            setValues({
                ...values,
                title:"",
                description:"",
                
                success:true,
                
            })
            successMessage("Category Save Successfylly");
          }
        }

        )
        .catch(err=>{
            console.log(err)
        })
    }
    const addForm=()=>(
        <div className="col-md-6 offset-3 ">
                             
        <form onSubmit={addSubmit}>
            <div className="form-group">
               <label htmlFor="name">Title </label>
               <input type="text" className="form-control" 
               name="title"
               onChange={e=>handelChange(e)}
               value={title}
                placeholder="Enter Your Title" />
            </div>
            <div className="form-group">
               <label htmlFor="description">Description</label>
               <input type="text" className="form-control" 
               name="description"
               onChange={e=>handelChange(e)}
               value={description}
               placeholder="Enter Your Description" />
            </div>
            <div className="form-group d-flex  col-md-6 offset-3 justify-content-center">
                <button type="submit" className="btn btn-success">Add category</button>
            </div>  
         </form>

      </div>
    )
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
    
    return (
       <AdminDashboard title="Add Category ">
       {ErrorMessage()}
        {addForm()}
        
        
                      
        </AdminDashboard>
    );
}

export default AddCategory;