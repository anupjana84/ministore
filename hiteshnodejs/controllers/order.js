const {Order,Productcart}= require("../models/order")
const {getUserById}=require("../controllers/user")
const {paginate}  =require("../extra/pagination")




exports.createOrder=(req, res)=>{
    //console.log("req.body.order",req.profile,"order")
    
    req.body.order.user=req.profile
    const order= new Order(req.body.order)
    order.save((err,order)=>{
        if(err){
           return res.status(400).json({
               error:"Order Not save"
           })
        }
        res.json(order)
    })

}




exports.getOrderById=(req, res,next, id)=>{
    Order.findById(id)
    .populate("products.product","name price")
    .exec((err,order)=>{
        if (err) {
            return res.status(400).json({
                error:"Order Not Found"
            })
            
        }
        req.order=order
    })
    next()
}

exports.getAllOrder=(req,res)=>{
    const allcategory=  Order.find().populate("user","_id name email").exec((err,data)=>{
      if(err){
       return res.status(400).json({
          error:"Data not Found"
        })
      }else{
        

        const items =data

        // get page from query params or default to first page
        const page = parseInt(req.query.page) || 1;
    
        // get pager object for specified page
        const pageSize =5;
        const pager = paginate(items.length, page, pageSize);
    
        // get page of items from items array
        const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
    
        // return pager object and current page of items
        return res.json({ pager, pageOfItems });




       // return res.json(results);

      }
    })

    
}