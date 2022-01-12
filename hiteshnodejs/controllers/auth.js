const expressJwt =require('express-jwt');
const jwt =require('jsonwebtoken');
const {validationResult } = require('express-validator')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const bcrypt = require('bcryptjs');

const crypto =require("crypto")

const User =require("../models/user");

// const transporter = nodemailer.createTransport(sendgridTransport({
//     auth:{
//         api_key:"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"
//     }
// }))


const transporter = nodemailer.createTransport({
    service: 'gmail',
//  hostname: 'smtp.gmail.com',
    auth: {
    user: 'anup.jana@xigmapro.com',
    pass: 'xigmapro123'
    }
});

exports.register=(req,res)=>{
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
                        res.json({message:"yess" })
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

// login controller
exports.login=(req,res)=>{
    const errors =validationResult(req);
    const {email, password}=req.body;
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }else{
        User.findOne({email:email})
        .then((user)=>{
            if(!user){
                return res.status(400).json({
                    error:"Email Not Found"
                })
            }else{
                bcrypt.compare(password, user.password,(err,ressult)=>{
                    if(err){
                        return res.status(500).json({
                            error:"Server error Occeured"
                        })
                    }
                    if(!ressult){
                        return res.status(400).json({
                            error:"Password does not Match"
                        })
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
                })
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

// exports.sendmail=(req,res)=>{
    

    // var transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: 'amimadhu93@gmail.com',
    //     pass: 'Aaj9332968003@#%'
    //   }
    // });
    
    // var mailOptions = {
    //   from: 'amimadhu93@gmail.com',
    //   to: 'anup.jana@xigmapro.com',
    //   subject: 'Sending Email using Node.js',
    //   text: 'That was easy!',
    //   html: `<h1 style="color:red;">Welcome</h1><p>this is</p>
    //   <h1 style="color:green;">Welcome</h1><p>this is</p>`   
      
    // };
    
    // transporter.sendMail(mailOptions, function(error, info){
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log("yes send mail");
    //   }
    // });
// };


//protected routes
exports.isSignedIn = expressJwt({
  secret:"SECRET",
  algorithms: ['HS256'],
  userProperty: "auth"
});

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED"
    });
  }
  next();
};
exports.isAdmin=(req,res, next)=>{
    if(req.profile.role===0){
        return res.status(400).json({
            error:"You are Not Admin "
        })
    }
    next();
}
exports.singOut=(req,res)=>{
    res.clearCookie('toke');
    res.json({
        message:'Logout Successfully'
    })

}
exports.getAllUsers = (req,res) => {
    User.find()
    .then(user=>{
        return res.status(200).json({
            allUser:user
        })

    })
    .catch(err=>{
        console.log(err)
    })
    // try {
    //     let products =await User.find()
    //     res.render('allUsers',{products})
    //    // res.redirect('/allUsers')

    // }
    // catch(e){
    //     console.log(e)
    // }
 // res.render('allUsers')

}

exports.forGotPassword=(req, res)=>{

    crypto.randomBytes(32,(err,buffer)=>{
        if (err) {
            console.log(err)
            
        }
        const {email}=req.body
        const token =buffer.toString("hex")
        User.findOne({email:email})
        .then((user)=>{
            if (!user) {
                return res.status(422).json({
                    error:"Email Not Found"
                })
            }
            user.resetToken =token
            user.expireToken = Date.now() + 3600000
            user.save()
            .then(result=>{
                var mailOptions = {
                    from: 'anup.jana@xigmapro.com',
                    to: result.email,
                    cc:"janamadan154@gmail.com",
                    subject: 'Sending Email ',
                    text: 'That was easy!',
                    html: `<a style='backgroud-color:red;' 
                    href='http://localhost:3000/resetPassWord/${result.resetToken}'>${result._id} Email Verify</a>`   
                };
                transporter.sendMail(mailOptions);
                res.json({
                    message:"A Link Send Your Email"
                })
            })
        })
    })
}

exports.resetPassword=(req,res)=>{
    const{password,resetToken}= req.body
    console.log(password,"password" )
    console.log(resetToken,"resetToken" )

    User.findOne({resetToken:resetToken,expireToken:{$gt:Date.now()}})
    .then((user)=>{

       // console.log(user,'databee')
      //  console.log(Date.now(),'now')
        if (!user) {

           // console.log(user)
            return res.status(422).json({
                error:"Time Expired"
            })  
        }
        bcrypt.hash(password,12).then((hashpassword)=>{
          
            //console.log(hashpassword)
            user.password =hashpassword,
            user.restToken=undefined,
            user.expireToken= undefined
            user.save().then(saveuser=>{
                return res.json({
                    message:"New Password save Successfully"
                })

            })
        
        })
        

    })
    .catch(err=>{
        console.log(err)
    })


}