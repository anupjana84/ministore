const  express = require("express");
const router = express.Router();
const { check } = require('express-validator');
const {isSignedIn,isAuthenticated,isAdmin}=require("../controllers/auth");

const {getUserById}= require("../controllers/user");
const {createCategory,
    getAllCategory,
    categoryById,
    showCategory,
    deleteCategory,
    liveSearch,
    admigetCategory,
    updateCategory}=require("../controllers/category");

router.param("userId",getUserById);
router.param('catId',categoryById);

router.post("/admin/add/category/:userId",[
    check("title","Title is Required").not().isEmpty()
],
isSignedIn,
isAuthenticated,
isAdmin,
createCategory);



router.get("/all/:userId/category",
isSignedIn,
isAuthenticated,
isAdmin,

getAllCategory);



router.get("/admin/all/category",admigetCategory);
router.post("/admin/create/category",createCategory);
router.post("/searchCat/category",liveSearch);

router.get("/admin/edit/category/:catId/:userId",
isSignedIn,
isAuthenticated,
isAdmin,
showCategory);



router.put("/admin/update/category/:catId/:userId",[
    check("title","Title is Required").not().isEmpty()
],
isSignedIn,
isAuthenticated,
isAdmin,
updateCategory);



router.delete("/admin/deleteCat/category/:catId/:userId",deleteCategory)





module.exports = router;