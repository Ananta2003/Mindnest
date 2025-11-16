import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const MONGO_URL : any= process.env.MONGO_URL
mongoose.connect(MONGO_URL)

const userData = new mongoose.Schema ({
    username:{type:String , unique: true},
    password:String
})

const contentData = new mongoose.Schema ({
    link:String,
    title:String,
    tags:[{type: mongoose.Types.ObjectId , ref:"Tags"}],
    type:String,
    userId: {type : mongoose.Types.ObjectId , ref:'User',required: true  }
})

const tagData = new mongoose.Schema ({
    title: { type: String , required: true , unique: true} 
})


const linkSchema = new mongoose.Schema({
  hash: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});


export const User = mongoose.model('User',userData)
export const Content = mongoose.model('Content',contentData)
export const Tags = mongoose.model('Tags',tagData)
export const Link = mongoose.model('Link',linkSchema)

