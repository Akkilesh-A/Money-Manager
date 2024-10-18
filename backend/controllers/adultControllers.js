import { z } from "zod"
import { signInBody, signUpBody } from "./zodTypes.js"
import { User } from "../models/index.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { cloudinaryUpload } from "../helpers/cloudinaryUpload.js"

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
        console.log("here")
        const success=await signUpBody.parse(req.body)
        if(success){
            //Checking if email exists already
            console.log("here2")
            const existingUser = await User.findOne({email:email})
            console.log("here3")
            if(existingUser){
                return res.status(400).json({
                    message:"User with email exists already"
                })
            }
            if(!existingUser){
                console.log("here4")
                const hash=await bcrypt.hash(password,10)
                console.log(hash)
                const newUser=await User.create({
                    email:email,
                    password:hash,
                    name:name,
                    phoneNumber:phoneNumber
                })
                console.log("here5")
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

//getting user tags
async function getUserTags(req,res){
    try{
        const user=await User.findOne({email:req.body.authorization.email})
        return res.status(200).json({
            message:"Tags fecthed successfully",
            data:user.tags
        })
        
    }catch(err){
        console.log(err)
        return res.status(400).json({
            message:"Data fetch unsuccessful"
        })
    }
}

async function addUserTags(req, res) {
    const { newTag,newTagColor } = req.body;
    const userEmail = req.body.authorization.email;

    if (!newTag) {
        return res.status(400).json({
            status: "error",
            message: "No new tag provided",
            data: null
        });
    }

    try {
        const user = await User.findOne({ email: userEmail });
        
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
                data: null
            });
        }

        if (user.tags.includes(newTag)) {
            return res.status(400).json({
                status: "error",
                message: "Tag already exists",
                data: null
            });
        }

        const updatedUser = await User.findOneAndUpdate(
            { email: userEmail },
            { $push: { tags: newTag,tagColors:newTagColor } },
            { new: true }
        );

        return res.status(200).json({
            status: 'success',
            message: "New tag added successfully!",
            data: {tags:updatedUser.tags,tagColors:updatedUser.tagColors}
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: "error",
            message: "Operation unsuccessful. Please try again later.",
            data: null
        });
    }
}

async function deleteUserTag(req, res) {
    const { tagToDelete } = req.body;
    const userEmail = req.body.authorization.email;

    if (!tagToDelete) {
        return res.status(400).json({
            status: "error",
            message: "No tag specified for deletion",
            data: null
        });
    }

    try {
        const user = await User.findOne({ email: userEmail });
        
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
                data: null
            });
        }

        if (!user.tags.includes(tagToDelete)) {
            return res.status(404).json({
                status: "error",
                message: "Tag not found in user's tags",
                data: null
            });
        }

        const updatedUser = await User.findOneAndUpdate(
            { email: userEmail },
            { $pull: { tags: tagToDelete } },
            { new: true }
        );

        return res.status(200).json({
            status: 'success',
            message: "Tag deleted successfully!",
            data: updatedUser.tags
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: "error",
            message: "Operation unsuccessful. Please try again later.",
            data: null
        });
    }
}

async function getData(req,res){
    try{
        const token=req.headers.authorization.split(" ")[1]
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const user=await User.findOne({email:decoded.email})
        return res.status(200).json({
            message:"Data fetched successfully",
            data:user
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
    console.log(req.body)
    console.log(imgURL)
    return res.status(400).json({
        message:"Successful!"
    })
}

export {
    signIn,
    signUp,
    getData,
    updateProfile,
    getUserTags,
    addUserTags,
    deleteUserTag
}