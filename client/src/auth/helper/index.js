// import {
  
//   Redirect
 
// } from "react-router-dom";
// import React from 'react';

export const isAutheticated = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("jwt")) {
      return JSON.parse(localStorage.getItem("jwt"));
    } else {
      return false;
    }
  };







  
  export const singOut =(next)=>{
    localStorage.removeItem('jwt')
    localStorage.removeItem('address')
    next()

  }
export const checkout = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (JSON.parse(localStorage.getItem("__cart"))) {
      return JSON.parse(localStorage.getItem("__cart"));
    } else {
      return false;
    }
  };
export const address = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("address")) {
      return (localStorage.getItem("address"));
    } else {
      return false;
    }
  };
