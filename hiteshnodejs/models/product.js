const mongoose =require("mongoose")
const { ObjectId } = mongoose.Schema;
const producSchema= new mongoose.Schema({
    name:{
        type:String, 
        required:true,
        trim:true,
        maxlength:60
    },
    description:{
        type:String,
        
        trim:true,
        maxlength:3000
    },
    price:{
        type:Number,
        required:true,
        trim:true,
        maxlength:5
    },
    sold:{
        type:Number,
        default:0  
    },
    stock:{
        type:Number
    },
    cattegory:{
        type:ObjectId,
        ref:"Cattegory",
        required:true,
        
        
    },
    photo:{
     //   data:Buffer,
     //   coontentType:String
     type:String
        
    }



},{ timestamps: true })
module.exports=mongoose.model("Product", producSchema)