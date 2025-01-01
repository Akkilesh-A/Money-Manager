import { signInBody, signUpBody } from "./zodTypes.js"
import bcrypt from "bcrypt"
import { sendMail } from "../helpers/mailer.js";
import { responseJSON, errorMessages, mailTemplates, signJWT, saltRounds } from "../helpers/index.js";
import { User } from "../models/userSchema.js";
import jwt from "jsonwebtoken"

//JWT signed with _id

//Onboarding User
async function signUp(req, res) {
    try {
        const { email, password, name, phoneNumber } = req.body;

        // Validate input using Zod
        const validatedInput = await signUpBody.safeParse(req.body);
        if(validatedInput.success){
            // Check if user already exists
            const existingUser = await User.findOne({ email: email.toLowerCase() });
            if(existingUser){
                if (existingUser.isVerified) {                    
                    return res.status(400).json(responseJSON.error("User with this email already exists",{redirect:"/signin"}));
                }else{
                    return res.status(400).json(responseJSON.error("Verify with OTP sent to mail!",{redirect:"/otp"}));
                }
            }
            else{
                // Hash password
                const hash = await bcrypt.hash(password, saltRounds);
                // Generate OTP
                const otp = Math.floor(100000 + Math.random() * 900000);
                // Create new user
                const newUser = await User.create({
                    email: email.toLowerCase(),
                    password: hash,
                    name,
                    phoneNumber,
                    otp,
                    isVerified: false
                });
                // Send verification email
                const info=await sendMail(
                    email,
                    "Verification mail from Money Muncher",
                    `Your OTP is ${otp}`,
                    mailTemplates.signUpEmailBody(otp)
                );
                if(info.accepted.length!=0){
                    // Generate JWT
                    const jwtToken = signJWT(newUser._id)
                    res.status(201).json(responseJSON.success("SignUp successful!",{
                        token:jwtToken,
                        redirect:'/otp'
                    }));
                }else{
                    res.status(401).json(responseJSON.error("Error sending you OTP, try again later!",{
                        token:jwtToken
                    }));
                }

            }
        }else{
            console.log(validatedInput.error)
            return res.status(400).json(responseJSON.error(
                errorMessages.missingFields,
                null,
                validatedInput.error
            ))
        }
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json(responseJSON.error(errorMessages.serverFailure,null,error));
    }
}

//For verifying OTP
async function otpVerification(req, res) {
    try {
        const { otp, id } = req.body;

        // Check for missing fields
        if (!otp || !id) {
            return res.status(400).json(responseJSON.error(errorMessages.missingFields));
        }

        // Find the user by ID
        const existingUser = await User.findById(id);
        if (!existingUser) {
            return res.status(404).json(responseJSON.error("User not found"));
        }

        // Check if the user is already verified
        if (existingUser.isVerified) {
            return res.status(200).json(responseJSON.success("Verified already", { redirect: "/signin" }));
        }

        // Verify OTP
        if (existingUser.otp !== otp) {
            return res.status(400).json(responseJSON.error("Wrong OTP"));
        }

        // Update user verification status
        try {
            const jwtToken = await signJWT(existingUser._id);
            existingUser.isVerified = true;
            await existingUser.save();

            return res.status(200).json(responseJSON.success("Verification Successful!", {
                token: jwtToken,
                isVerified: existingUser.isVerified
            }));
        } catch (error) {
            console.error("Error during user update:", error);
            return res.status(500).json(responseJSON.error("Couldn't verify at this time!"));
        }
    } catch (error) {
        console.error('OTP verification error:', error);
        return res.status(500).json(responseJSON.error(errorMessages.serverFailure, null, error));
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

export const authControllers={
    signIn,
    signUp,
    userVerification,
    otpVerification
}