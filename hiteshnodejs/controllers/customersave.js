
const expressJwt =require('express-jwt');
const jwt =require('jsonwebtoken');
const {validationResult } = require('express-validator')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const bcrypt = require('bcryptjs');

const crypto =require("crypto")

const User =require("../models/user");






exports.customerSave=(req,res)=>{
    const errors =validationResult(req);
   
      if(!errors.isEmpty()){
          return res.status(422).json({
             error:errors.array()[0].msg
          })
         // console.log(errors.array()[0].msg)
      }else{
          const {name, email, password} =req.body
          User.findOne({email:email})
          .then(user=>{
              if (user) {
                  return res.status(400) .json({
                      error:"User Already Save"
                  })
              }
              bcrypt.hash(password,12,(errs,hash)=>{
                  if(errs){
                      return res.status(500).json({
                          error:"not"
                      }) 
                  }else{
                      var user = new User({name, email,password:hash});
                      //res.json(user)
                      user.save((err, users)=>{
                          if(err){
                              return res.status(400).json({
                                  error:'Data Not Save'
                              });
                          }

                          let token=jwt.sign({
                            _id:user._id
                        },"SECRET",{ expiresIn: '2h' })
                        res.cookie('token',token,{expiresIn:new Date()+99});
                        const {_id,name, email,role}=user
                        res.status(200).json({
                           //message:"Login Successfully",
                            token,user:{_id,name,email,role}
                        })










                          //res.json({message:"yess" })
                      //    else{
                          
                              
                              
                          
                      //         var mailOptions = {
                      //             from: 'anup.jana@xigmapro.com',
                      //             to: users.email,
                      //             cc:"janamadan154@gmail.com",
                      //             subject: 'Sending Email ',
                      //             text: 'That was easy!',
                      //             html: `<button style='backgroud-color:red;'> Email Verify</button>`   
                                  
                      //         };
                              
                      //         transporter.sendMail(mailOptions, function(error, info){
                      //             if (error) {
                      //                  console.log(error);
                      //             } else {
                      //                 res.json({message:"yess" })
                      //             }
                      //         });
                      //     }
                      });
                  }
              })
          }
          )
          .catch(err=>{
              console.log(err)
          })
      }  
  };
  