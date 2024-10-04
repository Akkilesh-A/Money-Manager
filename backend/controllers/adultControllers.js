import { z } from "zod"
import { signInBody, signUpBody } from "./zodTypes.js"
import { Adult } from "../models/index.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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
            const existingUser = await Adult.findOne({email:email})
            if(existingUser){
                return res.status(400).json({
                    message:"User with email exists already"
                })
            }
            if(!existingUser){
                const hash=await bcrypt.hash(password,10)
                const newUser=await Adult.create({
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
        // console.log(err)
        return res.status(400).json({
            message:"Field/s are not of requirements"
        }) 
    }

    res.status(200).json({
        message:"SignUp unsuccessful, Try again!"
    })
}

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
        const existingUser = await Adult.findOne({email:email})
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

async function getData(req,res){
    const token=req.headers.authorization.split(" ")[1]
    if(token){
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        try{
            const user=await Adult.findOne({email:decoded.email})
            res.status(200).json({
                message:"Data fetched successfully",
                data:user
            })
        }catch(err){
            console.log(err)
            res.status(400).json({
                message:"Data fetch unsuccessful"
            })
        }
    }
}

export {
    signIn,
    signUp
}