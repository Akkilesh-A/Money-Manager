import { z } from "zod"
import { signInBody, signUpBody } from "./zodTypes.js"
import { Transactions, User } from "../models/index.js"
import bcrypt from "bcrypt"
import jwt, { decode } from "jsonwebtoken"
import { cloudinaryUpload } from "../middlewares/index.js"
import { sendMail } from "../helpers/mailer.js"

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

//Onboarding User - JWT with _id
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
                const otp=Math.floor(100000 + Math.random() * 900000)
                const mailSent= await sendMail(
                    email,
                    "Verification mail from Money Muncher",
                    `Yout OTP is ${otp}`,
                    `<b>Yout OTP is ${otp}</b>`
                )
                const newUser=await User.create({
                    email:email,
                    password:hash,
                    name:name,
                    phoneNumber:phoneNumber,
                    otp:otp
                })
                const jwtToken=await jwt.sign({id:newUser._id},process.env.JWT_SECRET)
                return res.status(200).json({
                    message:"Successful! Check mail for OTP",
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

    res.status(400).json({
        message:"SignUp unsuccessful, Try again!"
    })
}

//For verifying OTP
async function otpVerification(req,res) {
    const {otp,token}=req.body
    if(!otp || !token){
        return res.status(404).json({
            message:"Input field/s not of requirements"
        })
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    try{
        const otpFromDB=await User.findById({_id:decoded.id})
        if(otpFromDB.otp==otp){
            const jwtToken=await jwt.sign({email:otpFromDB.email},process.env.JWT_SECRET)
            await User.findByIdAndUpdate({_id:decoded.id},{isVerified:true})
            const verificationStatus =await User.findById({_id:decoded.id})
            return res.status(200).json({
                message:"SignUp Successfull!",
                token:jwtToken,
                isVerified:verificationStatus.isVerified
            })
        }else{
            return res.status(400).json({
                message:"Wrong OTP"
            })
        }
    }catch(err){
        console.log(err)
        return res.status(404).json({
            message:"Unable to process your request at this time!"
        })
    }
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

//For User verification
async function userVerification(req,res){
    const token=req.token
    if(!token){
        return res.status(400).json({
            message:"User creds not found!"
        })
    }
    try{
        const existingUser=await User.findOne({email:token.email})
        if(!existingUser){
            return res.status(404).json({
                message:"User not found!"
            })
        }
        return res.status(200).json({
            message:"Session restored successfully!"
        })
    }catch(err){
        console.log(err)
        return res.status(404).json({
            message:"Unable to process your request at this time!"
        })
    }
}

//For Home Page
async function getNumberOfSpendingsPerTag(req,res){
    try{
        const token=req.token
        const user=await User.findOne({email:token.email})
        let transactions=await Transactions.find({from:user._id})
        let chartData=user.tags.map((tag,index)=>{
            let noOfSpendings=0
            transactions.map((transaction,miniIndex)=>{
                if(transaction.tag==tag){
                    noOfSpendings+=1
                }
            })
            return(
                {tagName:tag,spendings:noOfSpendings,fill:user.tagColors[index]}
            )
        })
        let chartConfig = {
            visitors: {
                label: "Number of Spendings",
            }
        };
      
        user.tags.forEach((tag, index) => {
            chartConfig[tag] = {
                label: tag,
                color: `hsl(var(--chart-${index + 1}))`
            };
        });
        return res.status(200).json({
            message:"Tags fecthed successfully",
            data:{
                chartData:chartData,
                chartConfig:chartConfig
            }
        })
        
    }catch(err){
        console.log(err)
        return res.status(400).json({
            message:"Data fetch unsuccessful"
        })
    }
}

async function getSpendingsPerTag(req,res) {
    try{
        const token=req.token
        const user=await User.findOne({email:token.email})
        let transactions=await Transactions.find({from:user._id})
        let chartData=user.tags.map((tag,index)=>{
            let spendings=0
            transactions.map((transaction)=>{
                if(transaction.tag==tag){
                    spendings+=transaction.amount
                }
            })
            return(
                {tagName:tag,spendings:spendings,fill:user.tagColors[index]}
            )
        })
        let chartConfig = {
            visitors: {
                label: "Number of Spendings",
            }
        };
      
        user.tags.forEach((tag, index) => {
            chartConfig[tag] = {
                label: tag,
                color: `hsl(var(--chart-${index + 1}))`
            };
        });
        return res.status(200).json({
            message:"Tags fecthed successfully",
            data:{
                chartData:chartData,
                chartConfig:chartConfig
            }
        })
        
    }catch(err){
        console.log(err)
        return res.status(400).json({
            message:"Data fetch unsuccessful"
        })
    }   
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
    const token=req.token
    const {tagName,tagColor} = req.body
    if(!tagName){
        return res.status(400).json({
            message : "No Tag Name found",
            data:null
        })
    }
    try{

    }catch(err){
        console.log(err)
        return res.status(400).json({
            message:"Unable to process request at this time",
            data:null
        })
    }
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
    createTransactionRecord,
    getNumberOfSpendingsPerTag,
    getSpendingsPerTag,
    userVerification,
    otpVerification
}