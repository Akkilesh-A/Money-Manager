import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
import zod from 'zod'
import bcrypt from 'bcrypt'
import { User,Transactions } from '../db/connection.js'
import { cloudinaryUpload } from '../utilities/cloudinaryUpload.js';
import mongoose from 'mongoose';

dotenv.config();
const jwtSecret = process.env.USER_JWT_SECRET

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
        const user = await User.create({name, email, password :hash,imgURL:"https://res.cloudinary.com/djeplonq5/image/upload/t_Square_Default_User/v1719914709/file_jmjj10.png",balance : 0})
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
    let {email, name, password} = req.body

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
    const existingUserDetails = await User.findById(userId)

    //hashing password and calling upload to cloudinary function
    const hash = await bcrypt.hash(password,12)
    const cloudinaryURL=await cloudinaryUpload(userId,`uploads/${req.file.filename}`) || existingUserDetails.imgURL;
     
    // name ? name = name : name = existingUser.name

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
    const{to,amount,tag} = req.body
    if(amount<=0){
        return res.status(400).json({
            message : "Invalid amount!"
        })
    }

    //start transaction session
    const session = await mongoose.startSession()
    session.startTransaction();

    try{
        //find from User
        const fromUser =await User.findById(userId).session(session)
        if(!fromUser || fromUser.balance<amount){
            await session.abortTransaction();
            return res.status(400).json({
                message : "Unable to proccess transaction, Amount exceeded balance!"
            })
        }

        //find to User
        const toUser =await User.findById(to).session(session)
        if(!toUser){
            await session.abortTransaction();
            return res.status(400).json({
                message : "User not found!"
            })
        }

        //Increment and decrement from respective accounts
        await User.updateOne({_id : userId},{$inc:{balance : -amount}}).session(session)
        await User.updateOne({_id : to},{$inc:{balance : amount}}).session(session)
        await Transactions.create({from : userId,to,amount,date : new Date(),tag:tag || "Miscellaneous"})

        //commiting transaction
        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            message : "Transaction Successful!"
        })

    }catch(error){
        await session.abortTransaction();
        session.endSession();
        console.error(error);
        res.status(500).json({
            message: "Transaction failed due to server error!"
        });
    }

}

async function getTransactions(req,res){
    const userId = req.userId
    
    const existingUser = await User.findById(userId)

    if(!existingUser){
        return res.status(200).json({
            message : "User not found!"
        })
    }

    const transactions = await Transactions.find({from : userId})

    res.status(200).json({
        transactions : transactions
    })

}

async function addTags(req, res) {
    const userId = req.userId;
    const newTags = req.body.newTags;

    // Ensure newTags is an array
    if (!Array.isArray(newTags) || newTags.length<1) {
        return res.status(400).json({
            message: "Invalid input. newTags should be an array of strings!"
        });
    }

    try {
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({
                message: "User not found!"
            });
        }

        // Optionally, filter out duplicate tags
        const updatedTags = [...new Set([...existingUser.tags, ...newTags])];

        await User.updateOne({ _id: userId }, { tags: updatedTags });

        return res.status(200).json({
            message: "Successful!"
        });
    } catch (err) {
        return res.status(500).json({
            message: "Unable to add tags!",
            error: err.message
        });
    }
}

async function removeTag(req,res){
    const userId = req.userId;
    const removeTag = req.body.removeTag;

    // Ensure newTags is an array
    if (!removeTag) {
        return res.status(400).json({
            message: "Invalid input."
        });
    }

    try {
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({
                message: "User not found!"
            });
        }

        const updatedTags = existingUser.tags.filter((tag)=>{
            return tag!==removeTag
        });

        await User.updateOne({ _id: userId }, { tags: updatedTags });

        return res.status(200).json({
            message: "Tag removed successfully!"
        });
    } catch (err) {
        return res.status(500).json({
            message: "Unable to add tags!",
            error: err.message
        });
    }
}

export {signUp, signIn, getProfile, updateProfile, sendMoney, getTransactions, addTags, removeTag}