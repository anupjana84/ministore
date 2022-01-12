const stripe = require("stripe")("sk_test_51HVynCAVzGyDujmhdFRWFbHehxFTdIdkRenCeyNaLhI4a4GRvbPufDbk852fpHqoKICgCxKBTYh8WMDscoit0ysS00pvN45CeL");
const uuid = require("uuid/v4");

exports.makepayment=(req, res)=>{
    const {products, token,totl}=req.body
   // console.log("product", totl)
  //  console.log("token", token)
   
   
   
    let amount = 0;
    products.map(p=>{
     let an =p.quantity;
     let am =p.price*an;
        amount=amount+am;
    })
   //console.log(ammount)
    const idempotencyKey = uuid();

    return stripe.customers.create({
        email:token.email,
        source:token.id

    })
    .then(customer=>{
        stripe.charges
        .create(
          {
        amount: amount * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the product`,
            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip
              }
            }

        },{
            idempotencyKey
        })
      //   .then((charges)=>stripe.charges.retrieve(

      // charges.id
      //   ))
        .then(result=>{
        // console.log(result.amount,"charge")
          
           return res.status(200).json({result})
            //console.log(result,"resu")
        })
        .catch(err=>{console.log(err,"errr")})
        
    })
    .catch(err=>console.log(err,"an"))
}