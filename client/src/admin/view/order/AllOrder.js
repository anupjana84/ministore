
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'


import AdminDashboard from '../../layout/AdminDashboard';
import { API } from '../../../backend';



const AllOrder=(props)=> {
    const [title, setQuery]=useState({
        searcname:""

    })



const[value, setPager]=useState({
    pager:{},
    pageOfItems :[]


});
const {searcname}=title;
const {pager,pageOfItems}=value;

const preLoad=()=>{
    allCate();
}
  const allCate=()=>{
    const params = new URLSearchParams(props.location.search);
    const page = parseInt(params.get('page')) || 1;
    if (page !== pager.currentPage) {
            fetch(`${API}/admin/all/order?page=${page}`,{
                method:"get",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
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
              console.log(pager,"pager")
             console.log(pageOfItems,"pageOfItems")
            })
            .catch(err=>{
                console.log(err)
            })
        }
        }


  const pagin=(name)=>{
   // const params = new URLSearchParams(props.location.search);
  //  const page = parseInt(params.get('page')) || 1;
    console.log(name,"page")
    //console.log(page)
   
            fetch(`${API}/admin/all/order?page=${name}`,{
                method:"get",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
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



    
const deleteCategory=(id)=>{
  
    fetch(`${API}/deleteCat/category/${id}`,{
        method:"delete",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        }
    })
    .then(data=>{
       if(data.error){
           console.log(data.error)
       }else{
        preLoad()

       }
    })    

}

  useEffect(() => {
    preLoad();
  },[]);

const searHandeler=(e)=>{
     setQuery({
         ...title,
         [e.target.name]:e.target.value

     })
 //console.log(e.target.value)

}

  const liveSearch=(e)=>{
    e.preventDefault();
    //  setQuery(title)
    const datas= {
        title:searcname

    }
    // console.log(title)
        fetch(`${API}/searchCat/category`,{
            method:"post",
            headers:{
               
                "Coontent-Type":"application/json"

            },
            body:JSON.stringify(datas)
        })
        .then(res=>{
            return res.json()
        })
        .then(result=>{
            const da =JSON.parse(result)
            console.log(da,"ssss")
            setQuery({
                searcname:""

            })
        })
        .catch(err=>{console.log(err)})
}
  return (
   
    <AdminDashboard title="All Category">

            <section className="content">
                <div className="container-fluid">
                    <div className="row">

                  
                    <div className="col-12">
                        <div className="card">
                        
                        {/* /.card-header */}
                        <div className="card-body">
                            <table id="example2" className="table table-bordered table-hover">
                            <thead className="text-center">
                                <tr className="text-center">
                                <th className="text-center"> SL NO.</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Description</th>
                                <th>Platform(s)</th>
                                <th>EDIT CATEGORY</th>
                                <th> DELETE CATEGORY</th>
                                <th> Customer Name</th>
                               
                                </tr>
                            </thead>
                            <tbody>
                            
                             
                                  {
                                    pageOfItems.map((data,i)=>{
                                    return(
                                        <tr key={i}>
                                        <td className="text-center">{i+1}</td>
                                <td className="text-center">{data.status}</td>
                                <td className="text-center">{data._id} </td>
                                <td className="text-center">
                                    <tr>
                                    {data.products.map((product, i)=>{
                                      return(  <td key={i}>{product.name}</td>
                                      )
                                    })}
                                       
                                       
                                    </tr>
                                </td>
                                    
                               
                            
                              
                                <td className="text-center" style={{color:"green"}}> 
                                    <Link className="btn btn-info" to={`/edit/category/${data._id}`}>
                                        <i className="nav-icon fas fa-edit" />
                                    </Link>
                                </td>
                                <td className="text-center" style={{color:"red"}}>
                                <button className="btn btn-danger" 
                                onClick={()=>{if(window.confirm("Are You Want Delete")){deleteCategory(data._id)}}}>
                                    <i className="nav-icon fas fa-trash" /></button> 
                                    </td>
                                <td className="text-center" style={{color:"red"}}> <i className="nav-icon fas fa-home" /></td>
                                <td className="text-center" > {data.user.name}</td>
                                </tr>
                                    )
                                })}  
                                
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
export default AllOrder;