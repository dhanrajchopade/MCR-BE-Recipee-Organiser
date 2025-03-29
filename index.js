import express from "express"

import { initializeDatabase } from "./db/db.connect.js"
import Recipee from './models/recipee.models.js'

import cors from "cors"
import dotenv from "dotenv"
//  import fs from "fs"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 4000

app.use(express.json())

initializeDatabase()

// const jsonData = fs.readFileSync("recipeeData.json","utf-8")
// const RecipeeData = JSON.parse(jsonData)

// async function seedData() {
//     try{
//         for(const recipeeData of RecipeeData){
// const newRecipee = new Recipee({
//     name: recipeeData.name,
//     cuisineType: recipeeData.cuisineType,
//     ingredients: recipeeData.ingredients,
//     instructions:recipeeData.instructions,
//     imgUrl: recipeeData.imgUrl,
// })
// await newRecipee.save()
// console.log("Data seeding completed successfully.")
//         }
//     }catch(error){
//         console.log("An error occured while seeding the data.", error)
//     }
// }
// seedData()



const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
  
//  Get all Recipee Data

async function readAllRecipee() {
    try{
        const allReadRecipees = await Recipee.find()
        return allReadRecipees
    }catch(error){
        console.log(error)
    }
}

app.get("/recipees", async(req,res)=>{
    try{
        const recipee = await readAllRecipee()
        if(recipee.length!=0){
            res.json(recipee)
        }else{
            res.status(404).json({error:"No recipee Found."})
        }
    }catch(error){
        res.status(500).json({error:"Failed to fetch recipees."})
    }
})

// Get Recipees By Id

app.get("/recipees/:id", async(req,res)=>{
    try{
        const recipee = await Recipee.findById(req.params.id)
        if(!recipee){
            return res.status(404).json({error:"Recipee not found."})
        }
        res.json(recipee)
    }catch(error){
        res.status(500).json({error:"Failed to fetch recipee."})
    }
})

// Delete Recipee Function
app.delete("/recipees/:id", async (req, res) => {
    try {
        const recipee = await Recipee.findByIdAndDelete(req.params.id);
        if (!recipee) {
            return res.status(404).json({ error: "Recipee not found" });
        }
        res.status(200).json({ message: "Recipee deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete recipee." });
    }
});

// Function to Add A Recipee
app.post("/recipees", async (req, res) => {
    const { name, cuisineType, ingredients, instructions, imgUrl } = req.body;
    if (!name || !cuisineType || !ingredients || !instructions || !imgUrl) {
        return res.status(400).json({error: "Recipee Name, Cuisine Type, Ingredients, Instructions, and Image URL are required.",});
    }
    try {
        const newRecipee = await Recipee.create({ name, cuisineType, ingredients, instructions, imgUrl });
        res.status(201).json({ message: "Recipee added successfully.", recipee: newRecipee });
    } catch (error) {
        res.status(500).json({ error: "Failed to add recipee." });
    }
});


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})