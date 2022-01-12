const express =require("express")
const router =express.Router()
const {shippingAddress,userGetAddress,updateAddress} =require("../controllers/Shipping")
const { check } = require('express-validator');

router.post("/shipping/address/create",
[
    check("name","Name must be Required").not().isEmpty(),
   
    check("mobile","Mobile must be Require").not().isEmpty(),
    check("pincode","Pincode must be Require").not().isEmpty(),
    check("state","State must be Require").not().isEmpty(),
    check("district","District must be Require").not().isEmpty(),
    check("city","City must be Require").not().isEmpty(),
    
		
],
shippingAddress
)
router.post("/get/shipping/address",userGetAddress)
router.post("/update/address",updateAddress)
module.exports =router