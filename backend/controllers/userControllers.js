import { z } from "zod"
import { signInBody, signUpBody } from "./zodTypes.js"
import { Transactions, User } from "../models/index.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { cloudinaryUpload } from "../middlewares/index.js"

const exampleUploads={
    fieldname: 'image',
    originalname: 'Profile_Pic-removebg-preview.png',
    encoding: '7bit',
    mimetype: 'image/png',
    destination: 'uploads/',
    filename: '6dbb4ca40e5e61a3bce2c6aa0a1dca34',
    path: 'uploads\\6dbb4ca40e5e61a3bce2c6aa0a1dca34',
    size: 209320
  }

//Onboarding User
async function signUp(req,res){
    const {email,password,name,phoneNumber}=req.body

    //Checking fields
    if(!email || !password || !name || !phoneNumber){
        return res.status(400).json({
            message:"Required field/s empty"
        })
    }

    //Parsing through zod types
    try{
        const success=await signUpBody.parse(req.body)
        if(success){
            //Checking if email exists already
            const existingUser = await User.findOne({email:email})
            if(existingUser){
                return res.status(400).json({
                    message:"User with email exists already"
                })
            }
            if(!existingUser){
                const hash=await bcrypt.hash(password,10)
                const newUser=await User.create({
                    email:email,
                    password:hash,
                    name:name,
                    phoneNumber:phoneNumber
                })
                const jwtToken=await jwt.sign({email:newUser.email},process.env.JWT_SECRET)
                return res.status(200).json({
                    message:"SignUp successful!",
                    token:jwtToken
                })
            }
        }
    }catch(err){
        console.log(err)
        return res.status(400).json({
            message:"Field/s are not of requirements"
        }) 
    }

    res.status(200).json({
        message:"SignUp unsuccessful, Try again!"
    })
}

//For already existing users
async function signIn(req,res){

    const {email,password}=req.body

    //Checking fields
    if(!email || !password){
        return res.status(400).json({
            message:"Required field/s empty"
        })
    }

    //Parsing through zod types
    try{
        const success=await signInBody.parse(req.body)
        //Checking if email exists already
        const existingUser = await User.findOne({email:email})
        if(existingUser){
            const hashedPassword=await bcrypt.compare(password,existingUser.password)
            if(!existingUser || !hashedPassword){
            return res.status(400).json({
                message:"Email or password is incorrect"
            })
            }
            const jwtToken=jwt.sign({email:existingUser.email},process.env.JWT_SECRET)
            return res.status(200).json({
                message:"SignIn successful!",
                token:jwtToken
            })
        }
        
    }catch(err){
        return res.status(400).json({
            message:"Field/s are not of requirements"
        }) 
    }

    res.status(200).json({
        message:"SignIn unsuccessful, Try again!"
    })
}

//For Tags Page
async function getUserTags(req,res){
    try{
        const user=await User.findOne({email:req.body.authorization.email})
        return res.status(200).json({
            message:"Tags fecthed successfully",
            data:{
                tags:user.tags,
                favoriteTags:user.favoriteTags,
                tagColors:user.tagColors
            }
        })
        
    }catch(err){
        console.log(err)
        return res.status(400).json({
            message:"Data fetch unsuccessful"
        })
    }
}

async function addUserTag(req,res) {
    
}

async function deleteUserTag(req,res) {
    
}

async function createTransactionRecord(req,res){  
    const {tag,title,amount,description}= req.body
    const imageFile=req.file.filename
    const imgURL=await cloudinaryUpload(imageFile)
    if(!tag || !title || !amount){
        return res.status(400).json({
            message:"Input fields empty",
            data:null
        })
    }
    try{
        const existingFromUser= await User.findOne({email:req.token.email})
        // const existingToUser= await User.findOne({_id:to})
        // if(!existingFromUser || !existingToUser){
        //     return res.status(400).json({
        //         message:"User not available",
        //         data:null
        //     })
        // }
        if(!existingFromUser){
            return res.status(400).json({
                message:"User not available",
                data:null
            })
        }
        const newTransaction=await Transactions.create({
            title:title,
            amount:amount,
            from:existingFromUser._id,
            to:null,
            tag:tag,
            receiptURL:imgURL,
            description:description
        })
        const userTransactionArrayUpdate=await User.updateOne({_id:existingFromUser._id},{
            $push:{transactions:newTransaction._id}
        })
        if(newTransaction){
            return res.status(200).json({
                message:"Created transaction successfully!",
                data:newTransaction
            })
        }
    }catch(err){
        console.log(err)
        return res.status(404).json({
            message:"Unable to process your request at this time!",
            data:null
        })
    }
}

async function getUserSpendings(req,res){
    const token=req.token
    try{
        const existingUser=await User.findOne({email:token.email})
        if(!existingUser){
            res.status(404).json({
                message:"User doesn't exist!",
                data:null
            })
        }
        const userId=existingUser._id
        const transactionsData=await Transactions.find({from:userId})
        // console.log(transactionsData)
        res.status(200).json({
            message:"Successful!",
            data:transactionsData
        })

    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"An error occurred while processing your request.",
            data:null
        })
    }    
}

async function getUserProfile(req,res){
    try{
        const token=req.headers.authorization.split(" ")[1]
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const user=await User.findOne({email:decoded.email})
        const dataToBeSent={
            name:user.name,
            email:user.email,
            imgURL:user.imgURL,
            isChild:user.isChild,
            parentConnectionStatus:user.parentConnectionStatus
        }
        return res.status(200).json({
            message:"Data fetched successfully",
            data:dataToBeSent
        })
    }catch(err){
        console.log(err)
        return res.status(400).json({
            message:"Data fetch unsuccessful"
        })
    }
}

async function updateProfile(req,res){
    const {name,phoneNumber,email,password}=req.body
    const image=req.file
    const imgURL= await cloudinaryUpload(image)
    // console.log(req.body)
    // console.log(imgURL)
    return res.status(400).json({
        message:"Successful!"
    })
}

export const userControllers={
    signIn,
    signUp,
    getUserProfile,
    updateProfile,
    getUserTags,
    addUserTag,
    deleteUserTag,
    getUserSpendings,
    createTransactionRecord
}