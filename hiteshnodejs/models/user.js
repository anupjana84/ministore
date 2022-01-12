const mongoose =require('mongoose');
const userShcema = new mongoose.Schema({
    name:{
        type:String,
        maxlength:32,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        maxlength:50,
        required:true,
        trim:true,
        

    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    resetToken:String,
    expireToken:{
        type: Date,
        required: false
    },
    userinfo:{
        type:String,
        trim:true
    },
    role: {
        type: Number,
        default: 0
      },
      purchases: {
        type: Array,
        default: []
      }
    

},{timestamps:true})
module.exports=mongoose.model('User',userShcema);