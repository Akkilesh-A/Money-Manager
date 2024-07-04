import zod from 'zod'
import {Admin, User, Transactions} from '../db/connection.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken'
const jwtSecret = process.env.ADMIN_JWT_SECRET

const signUpBody=zod.object({
    email : zod.string().email().min(7),
    name: zod.string().min(3),
    password : zod.string().min(6)
})

const signInBody=zod.object({
    email : zod.string().email().min(7),
    password : zod.string().min(6)
})

const transactionBody=zod.object({
    to : zod.string().min(10),
    amount : zod.number().positive()
})

async function signUp(req,res){
    const email= req.body.email
    const name= req.body.name
    const password= req.body.password

    //checking with zod 
    const success = signUpBody.safeParse({email,name,password})
    if(!success.success){
        return res.status(400).json({
            message : "Check your details again!"
        })
    }

    //checking for existing user
    const existingAdmin= await Admin.findOne({
        email
    })
    if(existingAdmin){
        return res.status(400).json({
            message : "User exisits already!"
        })

    }

    //hashing password
    const hash = await bcrypt.hash(password,10)

    //creating a new user
    const newAdmin = await Admin.create({
        email,
        name,
        password : hash
    })

    //creating jwt
    const token=jwt.sign({_id : newAdmin._id},jwtSecret,{
        expiresIn : '1h'
    })
    res.status(200).json({
        message : `Details from form are ${name} , ${email}, ${hash} , ${newAdmin._id}`,
        token : token
    })
}

async function signIn(req,res){
    const {email, password} = req.body

    //checking for empty fields
    if(!email || !password){
        return res.status(400).json({
            message : "Details not filled!"
        })
    }
    
    //input validation
    const success = signInBody.safeParse({
        email,
        password
    })
    if(!success.success){
        return res.status(400).json({
            message : "Fill details again!"
        })
    }

    const existingAdmin=await Admin.findOne({email : email})
    //checking existing admin 
    if(!existingAdmin){
        return res.status(400).json({
            message : "Admin not found! Please register first"
        })
    }

    //checking hash
    const bcryptSuccess= await bcrypt.compare(password,existingAdmin.password)

    if(!bcryptSuccess){
        return res.status(400).json({
            message: "Wrong password!"
        })
    }

    //generating jwt token
    const token=jwt.sign({_id : existingAdmin._id},jwtSecret,{
        expiresIn : '1h'
    })

    res.status(200).json({
        message : "Signed In",
        token : token
    })

}

async function createConnection(req,res){
    const adminId = req.adminId
    const {userId} = req.body

    const existingAdmin = await Admin.findById(adminId)

    if(!existingAdmin.userConnectionStatus){
        const connectingUser=await Admin.updateOne({_id:adminId},{userConnectionStatus : true,userId : userId})
        const connectingAdmin=await User.updateOne({_id : userId},{adminConnectionStatus : true,adminId : adminId}) 
        if(!connectingUser.acknowledged || !connectingAdmin.acknowledged){
            return res.status(404).json({
                message : "Cannot update status! Try Again"
            })
        }
    }

    res.status(200).json({
        message : "Connection Established!"
    })
}

async function getConnection(req,res){

}

async function addBalance(req,res){
    const {to, amount} = req.body

    const success = transactionBody.safeParse({to , amount})
    if(!success.success){
        return res.status(403).json({
            message : "Invalid Inputs"
        }) 
    }

    try{
        await User.updateOne({_id: to},{$inc:{balance : +amount}})
        res.status(200).json({
            message : "Transaction Successful!"
        })
    }catch(err){
        res.status(403).json({
            message : "Transaction Failed"
        })
    }

}


export {signUp, signIn, addBalance}