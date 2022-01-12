const Cattegory =require("../models/category")
const {validationResult } = require('express-validator')
const {paginate}  =require("../extra/pagination")

exports.categoryById =(req, res, next, id)=>{
  Cattegory.findById(id).exec((err,cat)=>{
    if(err || !cat){
      return res.status(400).json({
        error:"Category Not Found"
      })
    }
    req.category =cat;
    next();

  })
}



exports.showCategory=(req,res)=>{
  const catId =req.category;
  Cattegory.findById(catId,(err, data)=>{
    if(err || !data){
      return res.status(400).json({
        error:"data naot fount"
      })
    
    }else{
        return res.status(200).json({
          message:data
        })
    }
  })
 
}
exports.deleteCategory=(req,res)=>{
  const catId= req.category

  Cattegory.findByIdAndDelete(catId,(err, data)=>{
    if(err || !data){
      return res.status(400).json({
        error:"Category Not Deleted"
      })
    }else{
      res.json({
        message:"Category Deleted Successfully"
      })
    }
  })

}

exports.updateCategory=(req,res)=>{
  const errors =validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).json({
       error:errors.array()[0].msg
    })
  }else{
      const cate =req.category;
  cate.title=req.body.title
  cate.description=req.body.description

  cate.save((err, data)=>{
    if(err) {
      return res.status(400).json({
        error:"Data Not Updated"
      })
    }
    res.status(200).json(data)
  })

}
 
}
  
exports.createCategory = (req, res) => {
  const errors =validationResult(req);
 
  if(!errors.isEmpty()){
      return res.status(422).json({
         error:errors.array()[0].msg
      })
    }else{
      const {title,description}= req.body
      const category = new Cattegory({
        title,description
      })
      Cattegory.findOne({title:title})
      .then((title)=>{
        if(title){
          return res.status(400).json({
            error:"Category already save"
        })
      }
      else{
        category.save((err, data)=>{
          if(err || !data){
            return res.status(400).json({
              error:"data not save"
    
            })
          }else{
            return res.status(200).json({
              message:"data seve"
            })
          }
        })
      }
      })
      .catch(err=>{
        console.log(err)
      })
    }
  };


  exports.getAllCategory=(req,res)=>{
  const allcategory=  Cattegory.find
   
    ((err,data)=>{
      if(err){
       return res.status(400).json({
          error:"Data not Found"
        })
      }else{
        const items =data
        // get page from query params or default to first page
        const page = parseInt(req.query.page) || 1;
    
        // get pager object for specified page
        const pageSize =2;
        const pager = paginate(items.length, page, pageSize);
    
        // get page of items from items array
        const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
    
        // return pager object and current page of items
        return res.json({ pager, pageOfItems });

       // return res.json(results);

      }
    })

  }







  exports.liveSearch=(req,res)=>{
    const {title}=req.body; 
    Cattegory.find({title:{$regex : title}},
        ((err,data)=>{
            if(err){
            return res.status(400).json({
                error:"Data not Found"
                })
            }else{
                const items =data

                // get page from query params or default to first page
                const page = parseInt(req.query.page) || 1;
            
                // get pager object for specified page
                const pageSize =2;
                const pager = paginate(items.length, page, pageSize);
            
                // get page of items from items array
                const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
            
                // return pager object and current page of items
                return res.json({ pager, pageOfItems });
            
            }
        })
  )  

}



  exports.admigetCategory=(req, res)=>{
    Cattegory.find().exec((err,data)=>{
      if(err){
        return res.status(400).json({
          error:"Data Not Found"
        })
      }else{
        return res.json(data)
      }

    })
  }