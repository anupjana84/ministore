

require("dotenv").config();
const {MONGOURI} = require('./key')



const express =require('express');
const app =express();

const cors =require('cors');
const mongoose =require('mongoose');
const bodyPerser =require('body-parser');
const cookiePerser=require('cookie-parser');




const registerRouter=require('./routes/authRoute')
const category =require("./routes/category")
const productRouter =require("./routes/product")
const shippinRoute =require("./routes/shippinRoute")
const paymentRoute =require("./routes/paymentRoute")
const orderRoute =require("./routes/orderRoute")




app.use(bodyPerser.urlencoded({ extended: false }))
app.use(bodyPerser.json());
app.use(cors());
app.use(cookiePerser());



app.use('/api', registerRouter);
app.use('/api', category);
app.use('/api', productRouter);
app.use('/api', shippinRoute);
app.use('/api', paymentRoute);
app.use('/api', orderRoute);



const port =process.env.MONGOURI || 3200;
//mongodb+srv://jojo:Aa9332968003@@cluster0.dmohc.mongodb.net/ecom?retryWrites=true&w=majority
//mongodb://localhost:27017/ecom
// mongoose.connect(process.env.MONGOURI ,
//     {useUnifiedTopology: true, 
//     useNewUrlParser: true, 
//     useFindAndModify: false,
//     useCreateIndex: true})
// .then(()=>{
   
//     console.log('database connected')
// });

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});





// mongoose.connect(MONGOURI,{
//     useUnifiedTopology: true, 
//          useNewUrlParser: true, 
//          useFindAndModify: false,
//          useCreateIndex: true

// })
// mongoose.connection.on('connected',()=>{
//     console.log("conneted to mongo yeahh")
// })
// mongoose.connection.on('error',(err)=>{
//     console.log("err connecting",err)
// });





app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
  


    // app.listen(port,()=>{
    //     console.log(`server runing ${port}` );
       
    // });