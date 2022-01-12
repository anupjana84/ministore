import React  from 'react';
import { Link,withRouter} from 'react-router-dom'
import { singOut } from '../../auth/helper';

const Header = ({history}) => {
    
    return (
       <React.Fragment>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
    {/* Left navbar links */}
    <ul className="navbar-nav">
      <li className="nav-item">
        <span className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></span>
      </li>
      <li className="nav-item d-none d-sm-inline-block">
        <Link to="/" className="nav-link">Home</Link>
      </li>
      <li className="nav-item d-none d-sm-inline-block">
        <span  className="nav-link bg-info"
       onClick={()=>{
                singOut(()=>{
                  history.push('/')
              })
                       
      }}
        >Logout</span>
      </li>
    
    </ul>
    {/* SEARCH FORM */}
    
    {/* Right navbar links */}
    <ul className="navbar-nav ml-auto">
      {/* Messages Dropdown Menu */}
      <li className="nav-item dropdown">
  <span className="nav-link" data-toggle="dropdown" href="#">
    <i className="far fa-comments" />
    <span className="badge badge-danger navbar-badge">3</span>
  </span>
  <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
    <span  className="dropdown-item">
      {/* Message Start */}
      <div className="media">
        <img src={process.env.PUBLIC_URL+ "/dist/img/user1-128x128.jpg"} alt="User Avatar" className="img-size-50 mr-3 img-circle" />
        <div className="media-body">
          <h3 className="dropdown-item-title">
            Brad Diesel
            <span className="float-right text-sm text-danger"><i className="fas fa-star" /></span>
          </h3>
          <p className="text-sm">Call me whenever you can...</p>
          <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
        </div>
      </div>
      {/* Message End */}
    </span>
    
    <div className="dropdown-divider" />
    <div style={{width:"100%", height:"50px",backgroundColor:"red"}}></div>
    
    <div className="dropdown-divider" />
    <span className="dropdown-item dropdown-footer">See All Messages</span>
  </div>
</li>

      {/* Notifications Dropdown Menu */}
      <li className="nav-item dropdown">
        <span className="nav-link" data-toggle="dropdown">
          <i className="far fa-bell" />
          <span className="badge badge-warning navbar-badge">15</span>
        </span>
        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <span className="dropdown-item dropdown-header">15 Notifications</span>
          <div className="dropdown-divider" />
          <span className="dropdown-item">
            <i className="fas fa-envelope mr-2" /> 4 new messages
           
          </span>
        
        </div>
      </li>
     
    </ul>
  </nav>


  
  {/* /.navbar */}
       </React.Fragment>
    );
}

export default withRouter(Header);