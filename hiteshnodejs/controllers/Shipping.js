const ShippingAddress=require("../models/shipping")

const {validationResult } = require('express-validator')
 exports.shippingAddress =(req,res)=>{

    
     //console.log(name,district,city,state,alternatemobile,pincode,mobile,landmark,userid)
     const errors =validationResult(req);
 
     if(!errors.isEmpty()){
         return res.status(422).json({
            error:errors.array()[0].msg
         })
        // console.log(errors.array()[0].msg)
     }else{
        const {name,district,city,state,alternatemobile,pincode,mobile,landmark,userid}= req.body
     ShippingAddress.findOne({userid:userid})
     .then(address=>{
         if (address) {
             return res.status(400).json({
                 error:"Address Already Save"
             })
            
         }
         const fromdata = new ShippingAddress({
            name,district,city,state,alternatemobile,pincode,mobile,landmark,userid
    
         })
         fromdata.save((err, adddata)=>{
             if (err) {
                return res.status(400).json({
                    error:"Address Not Save"
                })
             }
          return  res.status(200).json({
              message:adddata
          })
         })
     })
     .catch(err=>console.log(err))
 }
}

 exports.userGetAddress=(req, res)=>{
     const {userid}= req.body
     ShippingAddress.findOne({
         userid:userid
     }).then(address=>{
         if(!address){
             return res.status(400).json({
                 error:"Address Not Found"
             })
         }
         res.json(
            address
         )
     })
 }
 exports.updateAddress=(req, res)=>{
     const{ name,district,city,state,alternatemobile,pincode,mobile,landmark,userid}=req.body
      ShippingAddress.findOne({userid:userid})
      .then((address)=>{
         if(!address){
             return res.status(400).json({
                 error:"Address Not Found"
             })
         }
         address.name=name
         address.district=district
         address.city=city
         address.state=state
         address.alternatemobile=alternatemobile
         address.pincode=pincode
         address.mobile=mobile
         address.landmark=landmark
           
         address.save().then(newaddress=>{
             return res.status(200).json({
                 message:newaddress.userid,
                 success:"Address Update Successfully"

             })
         }

         )
        
     })
    


 }