import React,{Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom';
import {singOut, isAutheticated } from '../auth/helper';
import { cartItem } from './helper/carthelper';

 const currentTab=(history, path)=>{
     if(history.location.pathname === path){
         return {backgroundColor:"#67E6DC"}
     }else{
        return {backgroundColor:""}
     }

 }

  const Menu=({history})=> {

   
    return (
      <nav className="navbar navbar-expand text-white bg-success">
      <div className="container">
      <span className="navbar-brandm text-white">Always expand</span>
      <span className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </span>
    
      <div className="collapse navbar-collapse" id="navbarsExample02">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                    <Link style={currentTab(history,"/")}
                     className="nav-link text-white" to="/">Home 
                    </Link>
                </li>
               
                {!isAutheticated() && (
                    <Fragment>
                <li className="nav-item">
                    <Link style={currentTab(history,"/register")}
                     className="nav-link text-white" to="/register">Regigtration</Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history,"/login")}
                    className="nav-link text-white" to="/login">Login</Link>
                
                </li>
               
                </Fragment>)}
                {isAutheticated() &&(
                    <li className="nav-item">
                    <span className="nav-link text-white "
                    onClick={()=>{
                        singOut(()=>{
                            history.push('/')
                        })
                       
                        }}
                    
                   >Logout</span>
                </li>

                )}
                
                <li className="nav-item">
                    <Link  style={currentTab(history,"/user/dashboard")} 
                    className="nav-link text-white" to="/user/dashboard">User D</Link>
                </li>
                <li className="nav-item">
                    <Link  style={currentTab(history,"/admin/dashboard")} 
                    className="nav-link text-white" to="/admin/dashboard">Admin D</Link>
                </li>
                
                <li  className="nav-item">
                <Link  className="nav-link text-white" style={{position:"relative", fontSize:"20px"}} to="/cart" >


                {/* {cartItem()?( <p>no</p>):(<p>yes</p>)} */}
                {cartItem("sss")  && (
                    
                    <p  className="cartsimble" style={{display:cartItem()==="0" ?"none":""}} >
                    {cartItem()}
                    </p>
                )}
                 
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                </Link>
                </li>
            </ul>
       
      </div>
      </div>
    </nav>
    )
}
export default withRouter(Menu);