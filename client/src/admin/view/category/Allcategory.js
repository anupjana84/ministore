
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'

import AdminDashboard from '../../layout/AdminDashboard';
import { API } from '../../../backend';
import { isAutheticated } from '../../../auth/helper';
import { successMessage } from '../../../utility';


const Allcategory=(props
    
    )=> {
 //const serreload=f=>f
 //const reload=undefined
const history=useHistory()
const {user, token}=isAutheticated()


const [title,setTitle]=useState("")
const[value, setPager]=useState({
    pager:{},
    pageOfItems :[]


});
 
const {pager,pageOfItems}=value;

const searchTitle=(title)=>{
   //const titleone=e.target.value
   //alert(e)
  // console.log(e)
   //setTitle(e)
    const dataone={
        title:title
    }
   // console.log(dataone)
    
    fetch(`${API}/searchCat/category`,{
        method:"post",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(dataone)

    })
    .then(response=>{
        return response.json()
    })
    .then(({pager, pageOfItems})=>{
        // console.log(result)
       // setName(result.message)
       setPager({
         pager:pager,
         pageOfItems:pageOfItems
       })
   
     })
    .catch(err=>console.log(err))
}




const preLoad=()=>{
    allCate()
   
}
  const allCate=()=>{
   
    const params = new URLSearchParams(props.location.search);
    const page = parseInt(params.get('page')) || 1;
  //  if (page !== pager.currentPage) {
            fetch(`${API}/all/${user._id}/category?page=${page}`,{
                method:"get",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            })
            .then(data=>{
                return data.json()
            })
            .then(({pager, pageOfItems})=>{
               // console.log(result)
              // setName(result.message)
              setPager({
                pager:pager,
                pageOfItems:pageOfItems
              })
          
            })
            .catch(err=>{
                console.log(err)
            })
        }
      //  }


  const pagin=(name)=>{
   // const params = new URLSearchParams(props.location.search);
  //  const page = parseInt(params.get('page')) || 1;
   // console.log(name,"page")
    //console.log(page)
  
            fetch(`${API}/all/${user._id}/category?page=${name}`,{
                method:"get",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            })
            .then(data=>{
                return data.json()
            })
            .then(({pager, pageOfItems})=>{
               // console.log(result)
              // setName(result.message)
              setPager({
                pager:pager,
                pageOfItems:pageOfItems
              })
            //  console.log(pager,"pager")
            //  console.log(pageOfItems,"pageOfItems")
            })
            .catch(err=>{
                console.log(err)
            })
     
        }

const handeleDelete=(id,name)=>{
    Swal.fire({
        title: 'Are you sure?',
        text: `${name} Confirm Delete`,
      
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `Yes Delete`
      }).then((result) => {
      // alert(result.value)
        if (result.value) {
            deleteCategory(id)
        }
      })
}

    
const deleteCategory=(id)=>{
  
    fetch(`${API}/admin/deleteCat/category/${id}/${user._id}`,{
        method:"delete",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        
        }
    })
    .then(data=>{
       if(data.error){
       alert('yes')
       }else{
        successMessage("Deleted Successfull")
        preLoad()
        
       // allCate();

       }
    })    

}

  useEffect(() => {
    allCate();
  },[]);



 
  return (
   
    <AdminDashboard title="All Category">

            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="form-group col-md-6 offset-3">
                            <label>Search</label>
                                <input type="text" className="form-control" 
                                
                                onChange={(e)=>setTitle(e.target.value)}
                                value={title}
                                onKeyUp={(e)=>searchTitle(e.target.value)}
                                placeholder="Search" />
                            </div>
                            <div className="form-group col-md-6">
                            </div>
                        </div>
                        <div className="card">
                        
                        {/* /.card-header */}
                        <div className="card-body">
                            <table id="example2" className="table table-bordered table-hover">
                            <thead className="text-center">
                                <tr className="text-center">
                                <th className="text-center"> SL NO.</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Platform(s)</th>
                                <th>EDIT CATEGORY</th>
                                <th> DELETE CATEGORY</th>
                               
                                </tr>
                            </thead>
                            <tbody>
                             
                                  { pageOfItems.length>0?
                                  (  pageOfItems.map((data,i)=>{
                                    return(
                                        <tr key={i}>
                                        <td className="text-center">{i+1}</td>
                                <td className="text-center">{data.title}</td>
                                <td className="text-center">{data.title}
                                    
                                </td>
                            
                              
                                <td className="text-center" style={{color:"green"}}> 
                                    <Link className="btn btn-info" to={`/edit/category/${data._id}`}>
                                        <i className="nav-icon fas fa-edit" />
                                    </Link>
                                </td>
                                <td className="text-center" style={{color:"red"}}>
                                <button className="btn btn-danger" onClick={()=>{handeleDelete(data._id,data.title)}}>
                                    <i className="nav-icon fas fa-trash" /></button> 
                                    </td>
                                {/* <td className="text-center" style={{color:"red"}}>
                                <button className="btn btn-danger" onClick={()=>{if(window.confirm("Are You Want Delete")){deleteCategory(data._id)}}}>
                                    <i className="nav-icon fas fa-trash" /></button> 
                                    </td> */}
                                <td className="text-center" style={{color:"red"}}> <i className="nav-icon fas fa-home" /></td>
                                </tr>
                                    )
                                })
                                  ):
                                  
                              (  <tr><td>
                                <h1>No Data found</h1>
                                </td></tr>  )
                                
                                }  
                                
                            </tbody>
                           
                            </table>
                        </div>
                        {/* /.card-body */}
                        </div>
                    </div>
                    {/* /.col */}
                    </div>
                    {/* /.row */}
                </div>
                {/* /.container-fluid */}
            </section>



            


            <div className="card-footer pb-0 pt-3">
                    {pager.pages && pager.pages.length &&
                        <ul className="pagination">
                            <li className={`page-item first-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                                <button onClick={()=>pagin(`${1}`)} className="page-link">First</button>
                            </li>
                            <li className={`page-item previous-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                                <button onClick={()=>pagin(`${pager.currentPage - 1}` )} className="page-link">Previous</button>
                            </li>
                            {pager.pages.map(page =>
                                <li key={page} className={`page-item number-item ${pager.currentPage === page ? 'active' : ''}`}>
                                    <button onClick={()=>pagin(`${page}`)}  className="page-link">{page}</button>
                                </li>
                            )}
                            <li className={`page-item next-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                                <button onClick={()=>pagin(`${pager.currentPage +1}`)}  className="page-link">Next</button>
                            </li>
                            <li className={`page-item last-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                                <button onClick={()=>pagin(`${pager.totalPages}`)} className="page-link">Last</button>
                            </li>
                        </ul>
                    }                    
                </div>
            
        </AdminDashboard>
  );
}
export default Allcategory;