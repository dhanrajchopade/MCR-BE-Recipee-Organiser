import mongoose from "mongoose";

const RecipeeSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        cuisineType:{
            type:String,
            required:true,
        },
        ingredients:{
            type:String,
            required:true,
        },
        instructions:{
            type:[String],
            required:true,
        },
        imgUrl:{
            type:String,
            required:true,
        },
    }, {timestamps:true}
)

const Recipee = mongoose.model("Recipee", RecipeeSchema)

export default Recipee

