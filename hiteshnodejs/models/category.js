const mongoose =require("mongoose")
const categorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        unique:true 
    },
    description:{
        type:String
    }
},{ timestamps: true })
categorySchema.index({
    title:"text",
    description:"text"


},{
    weight:{
        title:5,
        description:2
    }

}
)
module.exports =mongoose.model("Cattegory",categorySchema)