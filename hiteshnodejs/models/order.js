
const mongoose = require("mongoose");
const {ObjectId}= mongoose.Schema

const ProductCartShema = new mongoose.Schema({
    product:{
        type:ObjectId,
        ref:"Product"
    },
    name:String,
    quantity:Number,
    price:Number
});



const Productcart =mongoose.model("Productcart", ProductCartShema)

 const OrderShema = new mongoose.Schema({
     products:[ProductCartShema],
     transaction_id:String,
     amount:Number,
     address:String,
     update:Date,
     status:{
         type:String,
         default:"Received",
         enum:["cancelled","Received","Delivered","Shipped","Proccessing"]
     },
     user:{
        type: ObjectId,
        ref:"User"
     }

 },{timestamps:true});

 const Order  =mongoose.model("Order", OrderShema)

 module.exports={Order, Productcart}