import React from 'react'
import 'react-toastify/dist/ReactToastify.min.css';
import  'bootstrap/dist/css/bootstrap.css';
import './style.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from './user/Login'
import Home from './core/Home';
//import HomeOne from './core/HomeOne';
import Register from './user/Register';
import ForgotPsssword from './user/ForgotPsssword';
import ResetPassWord from './user/ResetPassWord';



import UserDashboard from './user/UserDashboard';

import ProtectedRoute from './auth/helper/ProtectedRoute';
import AdminRoute from './auth/helper/AdminRoute';
import AdminDashboard from './admin/layout/AdminDashboard';
import AddCategory from './admin/view/category/AddCategory';
import Profile from './core/Profile';
import Allcategory from './admin/view/category/Allcategory';
import EditCategory from './admin/view/category/EditCategory';
import AddProduct from './admin/view/product/AddProduct';
//import AddOne from './admin/view/product/AddOne';
import EditProduct from './admin/view/product/EditProduct';
import AllProduct from './admin/view/product/AllProduct';
import Cart from './core/Cart';
import SingleProduct from './core/SingleProduct';
import Checkout from './core/Checkout';
import CheckOutRoute from './auth/helper/CheckOutRoute';
import Shipping from './core/Shipping';
import ShippingRoute from './auth/helper/ShippingRoute';
import Payment from './core/Payment';
import PaymentRoute from './auth/helper/PaymentRoute';

import AllOrder from './admin/view/order/AllOrder';




 const Routes=()=> {
    return (
        <BrowserRouter>
            <Switch>
               
                <Route exact path="/login" component={Login}/>
                <Route exact path="/forgotPsssword" component={ForgotPsssword}/>
                <Route exact path="/resetPassWord/:resetToken" component={ResetPassWord}/>
                <Route exact path="/allOrder/" component={AllOrder}/>
                
               
                <Route  exact path="/register" component={Register}/>
                <ShippingRoute  exact path="/shipping" component={Shipping}/>
                <CheckOutRoute  exact path="/checkout" component={Checkout}/>
                <PaymentRoute  exact path="/payment" component={Payment}/>

                <Route  exact path="/profile" component={Profile}/>
                <Route  exact path="/cart" component={Cart}/>
                <Route  exact path="/single/product/:productId" component={SingleProduct}/>

                <AdminRoute  exact path="/admin/dashboard" component={AdminDashboard}/>
                <ProtectedRoute  exact path="/user/dashboard" component={UserDashboard}/>
                <AdminRoute  exact path="/add/category" component={AddCategory}/>
                <AdminRoute  exact path="/edit/category/:catId" component={EditCategory}/>

                 {/* <AdminRoute  exact path="/add/product" component={AddProduct}/> */}
                <AdminRoute  exact path="/add/product" component={AddProduct}/>
                <AdminRoute  exact path="/edit/product/:productId" component={EditProduct}/>
                <AdminRoute  exact path="/all/product" component={AllProduct}/>
                
                
                <Route  exact path="/all/category" component={Allcategory}/>
                <Route exact path="/" component={Home}/>
            </Switch>
        </BrowserRouter>
    )
}
export default Routes;