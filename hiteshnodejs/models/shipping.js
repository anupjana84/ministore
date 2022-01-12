const mongoose =require("mongoose")
const { ObjectId } = mongoose.Schema;
const shippingSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    mobile:{
        type:String,
        required:true,
        trim:true
    },
    pincode:{
        type:String,
        required:true,
        trim:true
    },
    state:{
        type:String,
        required:true,
        trim:true
    },
    district:{
        type:String,
        required:true,
        trim:true
    },
    city:{
        type:String,
        required:true,
        trim:true
    },
   
    alternatemobile:{
        type:String,
       
        trim:true

    },
   
   
    landmark:{
        type:String,
        trim:true
    },
    userid:{
        type:ObjectId,
        ref:"User",
        required:true,
        

    }
    

},{timestamps:true})

module.exports=mongoose.model("ShippingAddress",shippingSchema );