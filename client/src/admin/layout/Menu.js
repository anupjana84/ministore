import React from 'react';
import { Link } from 'react-router-dom'
import { isAutheticated } from '../../auth/helper';

const Menu = () => {
    return (
        <React.Fragment>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
    {/* Brand Logo */}
    <span className="brand-link">
      <img src={process.env.PUBLIC_URL+ "/dist/img/AdminLTELogo.png"} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" 
     />
      <span className="brand-text font-weight-light" style={{fontSize:"16px"}}>{isAutheticated()?isAutheticated().user.email: "email.com"}</span>
    </span>
    {/* Sidebar */}
    <div className="sidebar">
      {/* Sidebar user panel (optional) */}
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          <img src={process.env.PUBLIC_URL+ "/dist/img/user2-160x160.jpg"} className="img-circle elevation-2" alt="User" />
        </div>
        <div className="info">
          <span className="d-block">Alexander Pierce</span>
        </div>
      </div>
      {/* Sidebar Menu */}
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}


         
          <li className="nav-item has-treeview menu-open">
            <span href="#" className="nav-link active">
              <i className="nav-icon fas fa-tachometer-alt" />
              <p>
                Product
                <i className="right fas fa-angle-left" />
              </p>
            </span>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <Link to="/add/product" className="nav-link">
                
                  <i className="far fa-calendar-plus nav-icon" />
                  <p>Add Product</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/all/product" className="nav-link">
                <i className="nav-icon fas fa-table"></i>
                  <p>All Product</p>
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link to="/add/category" className="nav-link">
                <i className="nav-icon fas fa-edit"></i>
                  <p>add Category</p>
                </Link>
              </li> */}
              
            </ul>
          </li>

          <li className="nav-item has-treeview menu-open">
            <span href="#" className="nav-link active">
              <i className="nav-icon fas fa-tachometer-alt" />
              <p>
                Category
                <i className="right fas fa-angle-left" />
              </p>
            </span>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <Link to="/add/category" className="nav-link">
                
                  <i className="far fa-calendar-plus nav-icon" />
                  <p>Add Category</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/all/category" className="nav-link">
                <i className="nav-icon fas fa-table"></i>
                  <p>All Category</p>
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link to="/add/category" className="nav-link">
                <i className="nav-icon fas fa-edit"></i>
                  <p>add Category</p>
                </Link>
              </li> */}
              
            </ul>
          </li>


          <li className="nav-item has-treeview menu-open">
            <span href="#" className="nav-link active">
              <i className="nav-icon fas fa-tachometer-alt" />
              <p>
                Order
                <i className="right fas fa-angle-left" />
              </p>
            </span>
            <ul className="nav nav-treeview">
             
              <li className="nav-item">
                <Link to="/allOrder" className="nav-link">
                <i className="nav-icon fas fa-table"></i>
                  <p>All Order</p>
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link to="/add/category" className="nav-link">
                <i className="nav-icon fas fa-edit"></i>
                  <p>add Category</p>
                </Link>
              </li> */}
              <li className="nav-item">
                <a href="./index3.html" className="nav-link active">
                  <i className="far fa-circle nav-icon" />
                  <p>Dashboard v3</p>
                </a>
              </li>
            </ul>
          </li>



{/* 

          <li className="nav-item">
            <span href="pages/widgets.html" className="nav-link">
              <i className="nav-icon fas fa-th" />
              <p>
                Widgets
                <span className="right badge badge-danger">New</span>
              </p>
            </span>
          </li>
          <li className="nav-item has-treeview">
            <span href="#" className="nav-link">
              <i className="nav-icon fas fa-copy" />
              <p>
                Layout Options
                <i className="fas fa-angle-left right" />
                <span className="badge badge-info right">6</span>
              </p>
            </span>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <span href="pages/layout/top-nav.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Top Navigation</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/layout/top-nav-sidebar.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Top Navigation + Sidebar</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/layout/boxed.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Boxed</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/layout/fixed-sidebar.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Fixed Sidebar</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/layout/fixed-topnav.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Fixed Navbar</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/layout/fixed-footer.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Fixed Footer</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/layout/collapsed-sidebar.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Collapsed Sidebar</p>
                </span>
              </li>
            </ul>
          </li>
          <li className="nav-item has-treeview">
            <span href="#" className="nav-link">
              <i className="nav-icon fas fa-chart-pie" />
              <p>
                Charts
                <i className="right fas fa-angle-left" />
              </p>
            </span>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <span href="pages/charts/chartjs.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>ChartJS</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/charts/flot.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Flot</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/charts/inline.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Inline</p>
                </span>
              </li>
            </ul>
          </li>
          <li className="nav-item has-treeview">
            <span href="#" className="nav-link">
              <i className="nav-icon fas fa-tree" />
              <p>
                UI Elements
                <i className="fas fa-angle-left right" />
              </p>
            </span>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <span href="pages/UI/general.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>General</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/UI/icons.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Icons</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/UI/buttons.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Buttons</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/UI/sliders.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Sliders</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/UI/modals.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Modals &amp; Alerts</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/UI/navbar.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Navbar &amp; Tabs</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/UI/timeline.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Timeline</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/UI/ribbons.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Ribbons</p>
                </span>
              </li>
            </ul>
          </li>
          <li className="nav-item has-treeview">
            <span href="#" className="nav-link">
              <i className="nav-icon fas fa-edit" />
              <p>
                Forms
                <i className="fas fa-angle-left right" />
              </p>
            </span>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <span href="pages/forms/general.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>General Elements</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/forms/advanced.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Advanced Elements</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/forms/editors.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Editors</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/forms/validation.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Validation</p>
                </span>
              </li>
            </ul>
          </li>
          <li className="nav-item has-treeview">
            <span href="#" className="nav-link">
              <i className="nav-icon fas fa-table" />
              <p>
                Tables
                <i className="fas fa-angle-left right" />
              </p>
            </span>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <span href="pages/tables/simple.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Simple Tables</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/tables/data.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>DataTables</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/tables/jsgrid.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>jsGrid</p>
                </span>
              </li>
            </ul>
          </li>
          <li className="nav-header">EXAMPLES</li>
          <li className="nav-item">
            <span href="pages/calendar.html" className="nav-link">
              <i className="nav-icon fas fa-calendar-alt" />
              <p>
                Calendar
                <span className="badge badge-info right">2</span>
              </p>
            </span>
          </li>
          <li className="nav-item">
            <span href="pages/gallery.html" className="nav-link">
              <i className="nav-icon far fa-image" />
              <p>
                Gallery
              </p>
            </span>
          </li>
          <li className="nav-item has-treeview">
            <span href="#" className="nav-link">
              <i className="nav-icon far fa-envelope" />
              <p>
                Mailbox
                <i className="fas fa-angle-left right" />
              </p>
            </span>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <span href="pages/mailbox/mailbox.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Inbox</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/mailbox/compose.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Compose</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/mailbox/read-mail.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Read</p>
                </span>
              </li>
            </ul>
          </li>
          <li className="nav-item has-treeview">
            <span href="#" className="nav-link">
              <i className="nav-icon fas fa-book" />
              <p>
                Pages
                <i className="fas fa-angle-left right" />
              </p>
            </span>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <span href="pages/examples/invoice.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Invoice</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/examples/profile.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Profile</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/examples/e-commerce.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>E-commerce</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/examples/projects.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Projects</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/examples/project-add.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Project Add</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/examples/project-edit.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Project Edit</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/examples/project-detail.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Project Detail</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/examples/contacts.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Contacts</p>
                </span>
              </li>
            </ul>
          </li>
          <li className="nav-item has-treeview">
            <span href="#" className="nav-link">
              <i className="nav-icon far fa-plus-square" />
              <p>
                Extras
                <i className="fas fa-angle-left right" />
              </p>
            </span>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <span href="pages/examples/login.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Login</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/examples/register.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Register</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/examples/forgot-password.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Forgot Password</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/examples/recover-password.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Recover Password</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/examples/lockscreen.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Lockscreen</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/examples/legacy-user-menu.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Legacy User Menu</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/examples/language-menu.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Language Menu</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/examples/404.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Error 404</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/examples/500.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Error 500</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/examples/pace.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Pace</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="pages/examples/blank.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Blank Page</p>
                </span>
              </li>
              <li className="nav-item">
                <span href="starter.html" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Starter Page</p>
                </span>
              </li>
            </ul>
          </li>
          <li className="nav-header">MISCELLANEOUS</li>
          <li className="nav-item">
            <span href="https://adminlte.io/docs/3.0" className="nav-link">
              <i className="nav-icon fas fa-file" />
              <p>Documentation</p>
            </span>
          </li>
         
         
         
         
         
         
         
          <li className="nav-header">MULTI LEVEL EXAMPLE</li>
          <li className="nav-item">
            <span href="#" className="nav-link">
              <i className="fas fa-circle nav-icon" />
              <p>Level 1</p>
            </span>
          </li>
          <li className="nav-item has-treeview">
            <span href="#" className="nav-link">
              <i className="nav-icon fas fa-circle" />
              <p>
                Level 1
                <i className="right fas fa-angle-left" />
              </p>
            </span>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <span href="#" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Level 2</p>
                </span>
              </li>
              <li className="nav-item has-treeview">
                <span href="#" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>
                    Level 2
                    <i className="right fas fa-angle-left" />
                  </p>
                </span>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <span href="#" className="nav-link">
                      <i className="far fa-dot-circle nav-icon" />
                      <p>Level 3</p>
                    </span>
                  </li>
                  <li className="nav-item">
                    <span href="#" className="nav-link">
                      <i className="far fa-dot-circle nav-icon" />
                      <p>Level 3</p>
                    </span>
                  </li>
                  <li className="nav-item">
                    <span href="#" className="nav-link">
                      <i className="far fa-dot-circle nav-icon" />
                      <p>Level 3</p>
                    </span>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <span href="#" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Level 2</p>
                </span>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <span href="#" className="nav-link">
              <i className="fas fa-circle nav-icon" />
              <p>Level 1</p>
            </span>
          </li>
          <li className="nav-header">LABELS</li>
          <li className="nav-item">
            <span href="#" className="nav-link">
              <i className="nav-icon far fa-circle text-danger" />
              <p className="text">Important</p>
            </span>
          </li>
          <li className="nav-item">
            <span href="#" className="nav-link">
              <i className="nav-icon far fa-circle text-warning" />
              <p>Warning</p>
            </span>
          </li>
          <li className="nav-item">
            <span href="#" className="nav-link">
              <i className="nav-icon far fa-circle text-info" />
              <p>Informational</p>
            </span>
          </li>
       
        */}
       
        </ul>
      
      
      
      </nav>
      {/* /.sidebar-menu */}
    </div>
    {/* /.sidebar */}
  </aside>
        </React.Fragment>
    );
}

export default Menu;