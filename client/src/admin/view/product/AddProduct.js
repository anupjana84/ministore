import React,{useState, useEffect} from 'react'


//import { createProduct } from '../../helper/adminhelper'
import { API } from '../../../backend'
import AdminDashboard from '../../layout/AdminDashboard'

import {toast } from 'react-toastify';

 const AddProduct=() =>{
    // const filein= React.createRef();
   // const [cate, setCate]=useEffect([])
     const [name ,setName]=useState("")

     const [description, setDescription]=useState("")
     const [price, setPrice]=useState("")
     const [stock, setStock]=useState("")
     const [image, setImage]=useState("")
     const [categories, setCategories]=useState([])
     const [category, setcCategory]=useState("")
   
    

     const [url,setUrl]=useState("")
     
   
        const errrorMessage=(error)=>{
            if(error){
            toast.warning(`${error}`,{
                position: toast.POSITION.TOP_CENTER
              }, { autoClose: 3000 })
            }
            
        }

        const successMessage=(data)=>{
            if(data){
            toast.warning(`${data}`,{
                position: toast.POSITION.TOP_CENTER
              }, { autoClose: 3000 })
            }
            
        }

        //getCategory
    const getAllCate=()=>{
        fetch(`${API}/admin/all/category`,{
            method:"get",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            }
        })
        .then((response)=>{
            return response.json()
        })
        .then((data)=>{
           setCategories(data)
        })
        .catch(err=>{console.log(err)})
    }

    //input change
   

    const handelSubmit=(e)=>{
       // console.log(image.type )
       e.preventDefault()
       console.log(image)
       if(!name || !description || !price || !stock || !image || !category){
            return errrorMessage('ALL Field Are Required')
        }
         if(image.size >1048576){
            return errrorMessage('Can Not Upload Image More Than 1MB')
        }
        
        if(image.type ==="application/pdf"){
            return errrorMessage('Not Upload Pdf File')
        }
       //console.log(object)
        const data = new FormData()
        data.append('file',image)
        data.append("upload_preset","ecom_node")
        data.append("cloud_name","dpxnlpmbk")
       // console.log(image)
      
          
          fetch(`https://api.cloudinary.com/v1_1/dpxnlpmbk/image/upload`,{
              method:"POST",
              body:data
          })
          .then(res=>{
              return res.json()
          })
          .then(result=>{
              if(result.error){
                   errrorMessage("Attach A File")
              }else{
                   setUrl(result.url)
              }
              
             // console.log(resule)
            
              //console.log(result)
         
          })
          .catch(err=>{
              console.log(err)
          })    
    
    }

    useEffect(()=>{
        if(url){
        fetch(`${API}/create/product`,{
            method:"POST",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                description,
                price,
                stock, 
                category,
                photo:url

            })
        })
      
        .then(res=>{
            return res.json()
        })
         .then(data=>{
            if(data.error){
                console.log(data.error)
               errrorMessage(data.error)
            }else{
                setName("")
                setPrice("")
                setDescription("")
                setImage("")
                setStock("")
                successMessage(data.message)
            }
             console.log(data)
     })
     .catch(err=>{console.log(err)}) 
    }
        getAllCate();
    },[url])



     const addForm=()=>(
        <div className="col-md-6 offset-3 ">
                             
        <form  >
            
            <div className="form-group">
               <label htmlFor="name" >Name<span style={{color:"red"}}>*</span> </label>
               <input type="text" className="form-control" 
               
               value={name}
               onChange={e=>setName(e.target.value)}
                placeholder="Enter Your name" />
            </div>
            <div className="form-group">
               <label >Description<span style={{color:"red"}}>*</span></label>
               <textarea type="text" className="form-control" rows="3"
            
               onChange={e=>setDescription(e.target.value)}
               value={description}
               placeholder="Enter Your Description" ></textarea>
            </div>
            <div className="form-group">
               <label htmlFor="price">Price<span style={{color:"red"}}>*</span></label>
               <input type="number" className="form-control" 
              
               onChange={e=>setPrice(e.target.value)}
               value={price}
               placeholder="Enter Your Price" />
            </div>
            <div className="form-group">
               <label htmlFor="stock">Stock<span style={{color:"red"}}>*</span></label>
               <input type="number" className="form-control" 
            
               onChange={(e)=>setStock(e.target.value)}
               value={stock}
               placeholder="Enter Your Stock" />
            </div>
            <div className="form-group">
               <label htmlFor="photo">Photo<span style={{color:"red"}}>*</span></label>
               <input type="file" className="form-control-file" 
                
             
               onChange={(e)=>{setImage(e.target.files[0])}}
              
               placeholder="Choose A File" />
            </div>
            <div className="form-group ">
                <label htmlFor="inputState">Category<span style={{color:"red"}}>*</span></label>
                 <select id="inputState" className="form-control" onChange={e=>setcCategory(e.target.value)}>
                 <option >Select</option>
                    { categories && categories.map((cate, i)=>{
                        return(
                          
                           
                            <option key={i} value={cate._id}>{cate.title}</option>

                        )
                    })}
                </select> 
            </div>
            <div className="form-group d-flex  col-md-6 offset-3 justify-content-center">
                <button type="submit" onClick={handelSubmit} className="btn btn-success">Add Product</button>
            </div>  
         </form>

      </div>
    )

    return (
        <AdminDashboard title="Add Product">
        
            {addForm()}
        </AdminDashboard>
    )
}
export default  AddProduct;