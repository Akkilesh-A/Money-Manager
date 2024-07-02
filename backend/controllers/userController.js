import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken'
const jwtSecret = process.env.USER_JWT_SECRET
import zod from 'zod'
import bcrypt from 'bcrypt'
import { User,Transactions } from '../db/connection.js'
import {readdirSync, rmSync} from 'fs'
import { cloudinaryUpload } from '../utilities/cloudinaryUpload.js';


const signUpBody=zod.object({
    name: zod.string().min(3),
    email : zod.string().email().min(7),
    password : zod.string().min(6)
})

const signInBody = zod.object({
    email : zod.string().email().min(7),
    password : zod.string().min(6)
})

async function signUp(req,res){  
    const {email, name, password} = req.body

    if(!name || !email || !password){
        return res.status(400).json({
            message : 'Missing Credentials!'
        })
    }

    const success = signUpBody.safeParse({email, name, password})

    const existingUser = await User.findOne({email})
    if(existingUser){
        return res.status(400).json({
            message : "User already exists!"
        })
    }else if(!success.success){
        return res.status(400).json({
            message : "Wrong Credentials!"
        })
    }else{
        const hash = await bcrypt.hash(password,12)
        const user = await User.create({name, email, password :hash,imgURL:"https://res.cloudinary.com/djeplonq5/image/upload/v1719914709/file_jmjj10.png",balance : 0})
        if(!user){
            return res.status(400).json({
                message : "Unable to create user!"
            })
        }
        const token=jwt.sign({_id : user._id},jwtSecret)
        res.status(200).json({
            message : "User Created Successfully!",
            token:token
        })
    }
}

async function signIn(req,res){
    const {email,password} = req.body

    const success=signInBody.safeParse({email,password})
    const existingUser = await User.findOne({email})
    if(!success.success){
        return res.status(400).json({
            message : "JSON not in correct format!"
        })
    
    }else if(!email || !password){
        return res.status(400).json({
            message : "Fill all Credentials"
        })
    }else if(!existingUser){
        return res.status(400).json({
            message : "User not found!"
        })
    }else if(existingUser && existingUser.password){
        const bcryptSuccess= await bcrypt.compare(password,existingUser.password)
        if(!bcryptSuccess){
            return res.status(400).json({
                message: "Wrong password!"
            })
        }
    }
    const token = jwt.sign({_id : existingUser._id},jwtSecret)
    res.status(200).json({
        message : "Logged in Successfully!",
        toke : token
    })

}

async function getProfile(req,res){
    const userId = req.userId
    const user =await User.findById(userId)

    res.status(200).json({
        message : "Balance retrieval successful",
        user : user
    })
}

async function updateProfile(req,res){

    const userId = req.userId
    const {email, name, password} = req.body

    //checking for empty fields
    if(!name && !email && !password){
        return res.status(400).json({
            message : 'Missing Credentials!'
        })
    }

    //input validation using zod
    const success = signUpBody.safeParse({email, name, password})
    if(!success.success){
        return res.status(400).json({
            message : 'Check Credentials Again!'
        })
    }

    //hashing password and calling upload to cloudinary function
    const hash = await bcrypt.hash(password,12)
    const cloudinaryURL=await cloudinaryUpload(userId,`uploads/${req.file.filename}`);

    //updating data in db
    const existingUser = await User.updateOne({_id : userId},{$set : {name,email,password : hash, imgURL : cloudinaryURL}})
    
    if(!existingUser){
        return res.status(400).json({
            message : 'Unable to update,Try again!'
        })
    }

    res.status(200).json({
        message : "User details updated successfully!"
    })
}

async function sendMoney(req,res){
    const userId = req.userId
    const{to,amount} = req.body
    res.status(200).json({
        message : "Upload Successful!"
    })

}

async function getTransactions(req,res){

}

export {signUp, signIn, getProfile, updateProfile, sendMoney, getTransactions}