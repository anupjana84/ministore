import React  from 'react'

import Footer from './Footer';
import Header from './Header';
 import Menu from './Menu';
 //import Content from './Content';
const AdminDashboard = (
  {
    title="my Home",
    children
}
) => {
    return (
       
     

<div className="wrapper">
  {/* Navbar */}
    <Header />
  {/* Main Sidebar Container */}
  <Menu/>
  {/* Content Wrapper. Contains page content */}
  
  <React.Fragment>
            <div className="content-wrapper">
           <section className="content-header">
               <div className="container-fluid">
                  <div className="row mb-2">
                     <div className="col-sm-6">
                     <h4> {title}</h4>
                     </div>
                     <div className="col-sm-6">
                     <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><span>{title}</span></li>
                        
                     </ol>
                     </div>
                  </div>
               </div>{/* /.container-fluid */}
               </section>

               <section className="content">
                  <div className="container-fluid">
                     <div className="row">
                        <div className="col-md-12"> 
                           <div className="card card-primary">
                             
                           </div>
                           {/*  CHILDREN COMPONENT */}
                           
                          
                           {/* CHILDREN COMPONENT  */}
                           {children}
                        </div>
                     </div>
                  </div>
               </section>
            </div>
</React.Fragment>
    {/* /.content */}
 
  {/* /.content-wrapper */}
  {/* Control Sidebar */}
  <aside className="control-sidebar control-sidebar-dark">
    {/* Control sidebar content goes here */}
  </aside>
  {/* /.control-sidebar */}
  {/* Main Footer */}
  <Footer/>
  
</div>

        
        
    );
}

export default AdminDashboard;