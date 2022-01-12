const express =require("express");
const router =express.Router();
const { check } = require('express-validator');
const { createProduct,getAllProduct,getProductById, 
    photo,singleProduct,deleteProduct,
    productByCategory,getProcuctOne,
    updateProduct

}= require("../controllers/product");

const {isAdmin, isAuthenticated, isSignedIn}= require("../controllers/auth")






const formidable =require("formidable");
router.param("productId",getProductById);
router.get("/product/photo/:productId", photo);

router.post("/create/product",


createProduct);
router.get("/edit/product/:productId", getProcuctOne)

router.get("/productbycategory/:id",productByCategory);
router.get("/all/product",getAllProduct);
router.get("/single/product/:productId",singleProduct);
router.put("/update/product/:productId",updateProduct);
router.delete("/deletepro/product/:productId",deleteProduct);






module.exports =router;