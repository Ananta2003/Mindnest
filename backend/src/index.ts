import express from 'express';
import { Content, Link, User } from './db';
import jwt from 'jsonwebtoken'
import { JWT_PASSWORD } from './config';
import { userMiddleware } from './middleware';
import { randomHash } from './utils';
import cors from "cors";
import dotenv from 'dotenv'

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

app.use(
  cors({
    origin: ["https://mindnest-frontend-adsf.onrender.com/"],
    credentials: true,
  })
);

const port = process.env.PORT;


app.post("/api/v1/signup", async(req,res)=>{

    const {username , password}= req.body

    await User.create({
        username:username,
        password:password
    }
) 
    res.json({
        message: "Signup Successful"
    })

})


app.post("/api/v1/signin", async(req,res)=>{
    const {username , password}= req.body

    const presentUser = await User.findOne({
        username:username,
        password:password
    })
    
    if(presentUser){
        const token = jwt.sign({
        id:presentUser._id
    },JWT_PASSWORD)
        res.json({
            token
        })
    }else{
        res.json({
            message: "User no found "
        })
    }
    
})


app.post("/api/v1/content", userMiddleware ,async (req,res)=>{
    const {link ,title }= req.body
    const type = req.body.type
    const userId = req.userId
    await Content.create({
        title:title,
        link:link,
        type:type,
        userId:userId,
        tags: []

    })
    res.json({
        message:"Content Added "
    })
})


app.put("/api/v1/update", async(req,res)=>{
    const userId = req.userId
    const contentId = req.body.contentId

    await Content.updateOne({
        userId:userId,
        contentId:contentId
    })
    res.json({
        message:"Content Updated "
    })
})


app.delete("/api/v1/delete", userMiddleware, async(req,res)=>{
    const userId = req.userId
    const contentId = req.body.contentId

    await Content.deleteMany({
        z:contentId,
        userId:userId

    })
    res.json({
        message: "Content Deleted"
    })

    
})

app.get("/api/v1/bulk",userMiddleware,async(req,res)=>{

    const userId = req.userId
    const content = await Content.find({
        userId:userId
    }).populate("userId","username")
    res.json({
        content
    })

    
})

app.get("/api/v1/type",userMiddleware,async(req,res)=>{

    const typeId = req.body
    const content = await Content.find({
        type:typeId
    }).populate("userId","username")
    res.json({
        content
    })

    
})

app.post("/api/v1/share", userMiddleware, async (req,res)=>{

    const {share} = req.body
    if(share){
        const existingLink = await Link.findOne({
            userId:req.userId
        });
        if(existingLink){

            res.json({
                hash:existingLink.hash
            })
            return;
        }
        const hash = randomHash(10);
        await Link.create({
            userId: req.userId,
            hash: randomHash(10) 
        })
        res.json({
            hash
        })
    }else{
        await Link.deleteOne({
            userId:req.userId
        })
         res.json({
            message:"Link has been Removed"
    })
    }

   
})

app.get("/api/v1/:sharelink", async(req,res)=>{

    const hash = req.params.sharelink

    const link = await Link.findOne({
        hash: hash
    })
    if(!link){
        res.json({
            message:"Incorrect Input "
        })
        return;
    }
        const content =await Content.find({
            _id:link.userId
        })

    const user=await User.findOne({
            _id: link.userId
        })

        if(!user){
            res.json({
                message:"User not found "
            })
            return;
        }

        res.json({
            username: user.username,
            content:content
        })

})

app.listen(port, async() => {
    console.log(`Server listening on port ${port}`);
});