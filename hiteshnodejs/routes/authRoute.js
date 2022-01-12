const  express = require("express");
const router = express.Router();
 //const {isSignedIn,}=require('../controllers/auth')

const { check } = require('express-validator');

const {register,
    login,
    getAllUsers,
    isAuthenticated,
    isSignedIn ,
    forGotPassword,
    resetPassword
}=require('../controllers/auth');
const {customerSave}= require("../controllers/customersave")

router.post("/register",
[
    check("name","Name must be Required").trim().isLength({min:3}),
    check("email", "Email is Required").isEmail(),
    check("password", "Password should be at least 3 Char").isLength({ min: 3})

],

register
);
router.post("/login",
[
    check('email',' Email is Required').isEmail(),
    check('password', 'Password is Required').not().isEmpty()

],
login
);
router.get('/allusers',
isSignedIn,
//isAuthenticated,

getAllUsers);

router.get('/test',isSignedIn,(req,res)=>{
    res.json(req.auth)
});

router.post("/customersave",[
    check("name","Name must be 3 Character").trim().isLength({min:3}),
    check("email", "Email is Required").isEmail(),
    check("password", "Password should be at least 3 Char").isLength({ min: 3})
],
customerSave);

router.post("/forgotpassword",forGotPassword)
router.post("/resetPassword",resetPassword)
module.exports = router;