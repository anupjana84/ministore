import React from 'react'
import Menu from './Menu'

 const Base = ({
     title="my Home",
   
     children

 }) => {
 
     return(
        <div>
        <Menu/>
        <div className="container-fluid">
            <div className="jumbotron text-white text-center bg-dark py-0">
                <h4 className="mt-3" >{title}</h4>
               
            </div>

            
            
                
            <div>{children}</div>
           
            <div className="container-fluid bg-success mt-5">
                <div className="container">
                    <div className="row text-center text-white mt-auto">
                        <h1>Footer</h1>
                    </div>
                </div>
            </div>
        </div>
   </div>

     )
 
    
     }
export default Base;