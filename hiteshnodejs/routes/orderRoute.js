const  express =require("express")
const router =express.Router()
const {isSignedIn, isAuthenticated, isAdmin} =require("../controllers/auth") 
const {getUserById, pushOrderInPurchaseList} =require("../controllers/user") 
const {getOrderById,createOrder,getAllOrder}= require("../controllers/order") 


router.param("userId", getUserById)
router.param("orderId",getOrderById)
router.post("/order/create/:userId",

isSignedIn,
isAuthenticated,
pushOrderInPurchaseList,
createOrder
)
router.get("/admin/all/order",
// isSignedIn,
// isAuthenticated,
// isAdmin,
getAllOrder)

module.exports=router