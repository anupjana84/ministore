const User =require('../models/user');
const Order=require("../models/order")

exports.getUserById=(req,res,next,id)=>{
    User.findById(id).select("-password").exec((error,user)=>{
        if(error || !user){
           return res.status(400).json({
                error:"User Not Found"
            })
        }
        req.profile=user
        next()
    })
    
}

exports.getUser=(req,res)=>{
    return res.json(req.profile)

}

exports.userPurchaseList=(req,res)=>{
    Order.find({user:req.profile._id})
    .populate("user", "_id name")
    .exec((err, order)=>{
        if (err) {
           return res.status(400).json({
                error:"Order Not Found"
            })
            
        }
        return res.josn(order)
    })
}
exports.pushOrderInPurchaseList=(req, res, next)=>{
    
    let purchases=[];
    
    req.body.order.products.forEach(product => {
        purchases.push({
            _id:product.id,
            name:product.name,
            price:product.price, 
            quantity:product.quantity

        })
        
    });
    User.findOneAndUpdate(
        {_id:req.profile._id},
        {$push:{purchases:purchases}},
        {new:true},
        (err,order)=>{
            if (err) {
                return res.status(400).json({
                    error:"Data Not Updated"
                })
            }
            next()
        }
    ) 
   
}