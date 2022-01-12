const Product =require("../models/product")
const formidable =require("formidable");
const _ =require("lodash");
const fs =require("fs");
const {validationResult } = require('express-validator')

exports.getProductById=(req,res,next,id)=>{
    Product.findById(id)
    .populate("cattegory","title")
    .exec((err,product)=>{
        if(err){
            return res.status(400).json({
                error:"Product Not found"
            })
        }
        req.product=product;
        next();
    })

}

exports.getProcuctOne=(req, res)=>{
    const productId =req.product
    Product.findById(productId, (err, data)=>{
        if (err || !data) {
            return res.status(400).json({
                error:"Product Not found"
            }) 
        }
        res.json(data)
    })
}


exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
      res.set("Content-Type", req.product.photo.contentType);
      return res.send(req.product.photo.data);
    }
    next();
  };

exports.createProduct=(req,res)=>{

   // let form =new formidable.IncomingForm();
   
   // form.keepExtensions=true;
  //  form.parse(req,(err,fields, file)=>{

      // console.log(fields,'fie')
     //   console.log(file,'filephot')


       const {name, description, stock, category ,price,photo }=req.body
       const cattegory =req.body.category
      //console.log(req.body)
           if(!category){
               return res.status(400).json({
                   error:"Category Field is Required"
               })
            }
           if(!name){
               return res.status(400).json({
                   error:"Name Field is Required"
               })
            }
            if(!description){
                return res.status(400).json({
                    error:"Description Field is Required"
                })
             }
           
            if(!price){
                return res.status(400).json({
                    error:"Price Field is Required"
                })
             }
             
             if(!stock){
                return res.status(400).json({
                    error:"Stock Field is Required"
                })
             }
             if(!photo){
                return res.status(400).json({
                    error:'Photo is  Required'
                })

             }
            //  if(file.photo.type == "application/pdf"){
            //     return res.status(400).json({
            //         error:'Pdf Not Upload'
            //     })
            // }
                
            // if (file.photo.size > 2097152) {
            //      return res.status(400).json({
            //          error:'Image Within 1MB'
            //     }) 
            // }   
            let product = new Product({name, description, stock, cattegory ,price,photo})

          //  product.photo.data = fs.readFileSync(file.photo.path);
          //  product.photo.contentType = file.photo.type;

            product.save((err,product)=>{
                        if(err){
                            return res.status(400).json({
                                error:"Data Not Save"
                            }) 
                        }
                        res.json({
                            message:`${product.name} Save SuccessfullY`
                        })  
                    }) 
        
 //   })

}

exports.updateProduct=(req,res)=>{
    const {name, description, stock ,price,photo }=req.body
    //console.log(req.body)
    const cattegory =req.body.category
    console.log(cattegory)
    const productId = req.product
    //console.log(productId)
    productId.name=name
    productId.description=description
    productId.stock=stock
    productId.price=price
    productId.photo=photo
   // productId.name=name
    productId.cattegory=cattegory


       
       
        //    if(!category){
        //        return res.status(400).json({
        //            error:"Category Field is Required"
        //        })
        //     }
        //    if(!name){
        //        return res.status(400).json({
        //            error:"Name Field is Required"
        //        })
        //     }
        //     if(!description){
        //         return res.status(400).json({
        //             error:"Description Field is Required"
        //         })
        //      }
           
        //     if(!price){
        //         return res.status(400).json({
        //             error:"Price Field is Required"
        //         })
        //      }
             
        //      if(!stock){
        //         return res.status(400).json({
        //             error:"Stock Field is Required"
        //         })
        //      }
        //      if(!photo){
        //         return res.status(400).json({
        //             error:'Photo is  Required'
        //         })

        //      }
            
        //     let product = new Product({name, description, stock, cattegory ,price,photo})

         

            productId.save((err,product)=>{
                        if(err){
                            return res.status(400).json({
                                error:"Data Not Save"
                            }) 
                        }
                        res.json({
                            message:`${product.name} Save SuccessfullY`
                        })  
                    }) 
        
 //   })

}

exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
      res.set("Content-Type", req.product.photo.contentType);
      return res.send(req.product.photo.data);
    }
    next();
  };

exports.getAllProduct=(req,res,next)=>{
 const allp= Product.find().populate("cattegory","title").exec((err,data)=>{
        if(err){
            return res.status(400).jsom({
                error:"Data Not Found"

            })
        }else{
            
            // const page =parseInt(req.query.page);
            // const limit =parseInt(req.query.limit)
            // const startIndex =(page-1)*limit;
            // const endIndex =page*limit
            // const result =data.slice(startIndex, endIndex)
            return res.json(data);
       
       
       
       
       
       
       
        }
       
        
   })
//return res.json(allp)

}

exports.singleProduct=(req,res)=>{
    const productId =req.product

    Product.findById(productId,(err, product)=>{
        if (err) {
            return res.status(400).json({
                error:"Product Not Found"
            })
        }else{
            res.json(product)
        }
       
    })

}



exports.deleteProduct=(req,res)=>{
    const productId =req.product;
    Product.findByIdAndDelete(productId,(err,product)=>{
        if (err) {
            return res.status(400).jsom({
                error:"Product Not Deleted"
            })
        }else{
            return res.status(200).json({
                message:"Product Deleted Succesfully"
            })
        }
    })
}

exports.productByCategory=(req, res)=>{

const {id}=req.params
Product.find({cattegory:id})
.then(product=>{
    if(!product){
        res.status(422).json({
            error:"Prod Product Not Found"
        })
    }
    res.json(product)
})
.catch(err=>{
    console.log(err)
})

}