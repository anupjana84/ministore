const  express = require("express");
const router = express.Router();
const {makepayment}=require("../controllers/payment")



router.post("/makepayment",makepayment)




module.exports =router