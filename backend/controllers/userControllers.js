import { z } from "zod"
import { signInBody, signUpBody } from "./zodTypes.js"
import { Transactions, User } from "../models/index.js"
import bcrypt from "bcrypt"
import jwt, { decode } from "jsonwebtoken"
import { cloudinaryUpload } from "../middlewares/index.js"
import { sendMail } from "../helpers/mailer.js"
import mongoose from "mongoose"
import { mail } from "../helpers/mailTemplate.js"

//Onboarding User - JWT with _id
async function signUp(req, res) {
    try {
        const { email, password, name, phoneNumber } = req.body;

        // Validate input using Zod
        const validatedInput = await signUpBody.parseAsync(req.body);

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({ message: "User with this email already exists" });
        }

        // Hash password
        const saltRounds = 12;
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
        await sendMail(
            email,
            "Verification mail from Money Muncher",
            `Your OTP is ${otp}`,
            `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>OTP Verification</title>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 20px;
                    }
                    .container {
                        background-color: #ffffff;
                        border-radius: 10px;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                        padding: 30px;
                        max-width: 600px;
                        margin: auto;
                    }
                    h1 {
                        color: #333333;
                        font-size: 24px;
                    }
                    p {
                        font-size: 16px;
                        color: #555555;
                    }
                    .otp {
                        font-size: 28px;
                        color: #007BFF;
                        font-weight: bold;
                        margin: 20px auto;
                        padding: 10px 20px;
                        border: 2px solid #007BFF;
                        display: inline-block;
                        border-radius: 5px;
                    }
                    footer {
                        margin-top: 30px;
                        font-size: 12px;
                        color: #777777;
                    }
                    .socials {
                        margin-top: 30px;
                        text-align: center;
                    }
                    .socials a {
                        margin: 0 10px;
                        text-decoration: none;
                    }
                    .socials img {
                        width: 32px; /* Adjust icon size */
                        height: auto;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Welcome to Money Muncher</h1>
                    <p>Your One-Time Password (OTP) is:</p>
                    <div class="otp">${otp}</div>

                    <!-- Social Links Section -->
                    <div class="socials">
                        <p>Checkout the developer:</p>
                        
                        <!-- LinkedIn Icon and Link -->
                        <a href="https://www.linkedin.com/in/akkilesh-a-620561275/" target="_blank">
                            <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn">
                        </a>

                        <!-- GitHub Icon and Link -->
                        <a href="https://github.com/Akkilesh-A" target="_blank">
                            <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub">
                        </a>
                    </div>

                    <footer>
                        If you did not request this email, please ignore it.
                    </footer>
                </div>
            </body>
            </html>`
        );

        // Generate JWT
        const jwtToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({
            message: "Signup successful! Check your email for OTP",
            token: jwtToken
        });
    } catch (error) {
        console.error('Signup error:', error);

        if (error.name === 'ZodError') {
            return res.status(400).json({ message: "Invalid input data", errors: error.errors });
        }

        res.status(500).json({ message: "An error occurred during signup. Please try again." });
    }
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

//For Home Page Graph1
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

//For Home Page Graph2
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

//For adding money to wallet
async function addMoney(req, res) {
    const { amount, description } = req.body;
    const { email } = req.token;

    if (!amount || isNaN(amount) || amount <= 0) {
        return res.status(400).json({
            message: "Valid amount is required",
            data: null
        });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const user = await User.findOne({ email }).session(session);
        if (!user) {
            throw new Error("User not found");
        }

        user.accountBalance += amount;
        await user.save({ session });

        const newTransaction = new Transactions({
            from: user._id,
            to: user._id,
            amount: amount,
            title: "Added Money to Wallet",
            description: description || "Added money to wallet",
            tag: "Add-Money",
            receiptURL: "N/A"
        });

        await newTransaction.save({ session });

        user.transactions.push(newTransaction._id);
        await user.save({ session });

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            message: "Money added successfully",
            data: {
                updatedBalance: user.accountBalance,
                transaction: newTransaction
            }
        });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();

        console.error("Error adding money:", err);
        return res.status(500).json({
            message: "An error occurred while processing your request",
            data: null
        });
    }
}

//For withdrawing money
async function withdrawMoney(req, res) {
    const { amount, description } = req.body;
    const { email } = req.token;

    if (!amount || isNaN(amount) || amount <= 0) {
        return res.status(400).json({
            message: "Valid amount is required",
            data: null
        });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const user = await User.findOne({ email }).session(session);
        if (!user) {
            throw new Error("User not found");
        }

        if (user.accountBalance < amount) {
            throw new Error("Insufficient balance");
        }

        user.accountBalance -= amount;
        await user.save({ session });

        user.totalSpent+=amount;
        await user.save({ session });

        const newTransaction = new Transactions({
            from: user._id,
            to: null,
            amount: amount,
            title: "Withdrawn Money",
            description: description || "Withdrawn money from wallet",
            tag: "Withdraw-Money",
            receiptURL: "N/A"
        });

        await newTransaction.save({ session });

        user.transactions.push(newTransaction._id);
        await user.save({ session });

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            message: "Money withdrawn successfully",
            data: {
                updatedBalance: user.accountBalance,
                transaction: newTransaction
            }
        });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();

        console.error("Error withdrawing money:", err);

        if (err.message === "Insufficient balance") {
            return res.status(400).json({
                message: "Insufficient balance",
                data: null
            });
        }

        return res.status(500).json({
            message: "An error occurred while processing your request",
            data: null
        });
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
    const {newTag,newTagColor} = req.body
    if(!newTag){
        return res.status(400).json({
            message : "No Tag Name found",
            data:null
        })
    }
    try{
        const oldTags=await User.findOne({email:token.email})
        if(oldTags.tags.includes(newTag)){
            return res.status(400).json({
                message:"Tag already exists",
                data:null
            })
        }
        const newAddedTag=await User.updateOne({email:token.email},{
            $push:{tags:newTag,tagColors:newTagColor}
        })
        const newTags=await User.findOne({email:token.email})
        if(newAddedTag){
            return res.status(200).json({
                message:"Tag added successfully!",
                data:{tags:newTags.tags,tagColors:newTags.tagColors}
            })
        }
    }catch(err){
        console.log(err)
        return res.status(400).json({
            message:"Unable to process request at this time",
            data:null
        })
    }
}

// async function addFavoriteTag(req,res) {
//     const token=req.token
//     const {tag}=req.body
//     if(!tag){
//         return res.status(400).json({
//             message:"No Tag found",
//             data:null
//         })
//     }
//     try{
//         const newFavoriteTag=await User.updateOne({email:token.email},{
//             $push:{favoriteTags:tag}
//         })
//         if(newFavoriteTag){
//             return res.status(200).json({
//                 message:"Favorite Tag added successfully!",
//                 data:newFavoriteTag
//             })
//         }
//     }catch(err){
//         console.log(err)
//         return res.status(400).json({
//             message:"Unable to process request at this time",
//             data:null
//         })
//     }    
// }

async function updateUserTag(req, res) {
    const { email } = req.token;
    const { oldTag, newTag, action } = req.body;

    if (!oldTag) {
        return res.status(400).json({
            message: "Old tag is required",
            data: null
        });
    }

    try {
        let message, userUpdateResult, transactionUpdateResult;

        // Check if the old tag exists for the user
        const user = await User.findOne({ email, tags: oldTag });
        if (!user) {
            return res.status(404).json({
                message: "Tag not found for this user",
                data: null
            });
        }

        switch (action) {
            case 'update':
                if (!newTag) {
                    return res.status(400).json({
                        message: "New tag is required for update action",
                        data: null
                    });
                }
                userUpdateResult = await User.updateOne(
                    { email, tags: oldTag },
                    { $set: { "tags.$": newTag } }
                );
                transactionUpdateResult = await Transactions.updateMany(
                    { userEmail: email, tag: oldTag },
                    { $set: { tag: newTag } }
                );
                message = "Tag updated successfully";
                break;

            case 'delete':
                userUpdateResult = await User.updateOne(
                    { email },
                    { $pull: { tags: oldTag } }
                );
                transactionUpdateResult = await Transactions.deleteMany(
                    { userEmail: email, tag: oldTag }
                );
                message = "Tag and associated transactions deleted successfully";
                break;

            case 'changeToOthers':
                userUpdateResult = await User.updateOne(
                    { email },
                    { $pull: { tags: oldTag } }
                );
                transactionUpdateResult = await Transactions.updateMany(
                    { userEmail: email, tag: oldTag },
                    { $set: { tag: 'Others' } }
                );
                message = "Tag deleted and transactions updated to 'Others'";
                break;

            default:
                return res.status(400).json({
                    message: "Invalid action specified",
                    data: null
                });
        }

        if (userUpdateResult.modifiedCount > 0 || transactionUpdateResult.modifiedCount > 0) {
            return res.status(200).json({
                message,
                data: {
                    userUpdate: userUpdateResult,
                    transactionUpdate: transactionUpdateResult
                }
            });
        } else {
            return res.status(404).json({
                message: "No changes made",
                data: null
            });
        }
    } catch (err) {
        console.error("Error updating user tag:", err);
        return res.status(500).json({
            message: "An error occurred while processing your request",
            data: null
        });
    }
}

async function createSpendingRecord(req,res){  
    const {tag,title,amount,description}= req.body
    const imageFile=req.file.filename
    const imgURL=await cloudinaryUpload(imageFile)
    if(!tag || !title || !amount){
        return res.status(400).json({
            message:"Input fields empty",
            data:null
        })
    }
    const token=req.token
    try{
        try{
            const user=await User.findOne({email:token.email})
            try{
                const newTransaction=await Transactions.create({
                    from:user._id,
                    to:null,
                    tag:tag,
                    title:title,
                    amount:amount,
                    description:description,
                    receiptURL:imgURL
                })
                return res.status(200).json({
                    message:"Spending record created successfully",
                    data:newTransaction
                })
            }catch(err){
                console.log(err)
                return res.status(404).json({
                    message:"Unable to create spending record",
                    data:null
                })
            }
        }catch(err){
            console.log(err)
            return res.status(404).json({
                message:"User doesn't exist!",
                data:null
            })
        }
    }catch(err){
        console.log(err)
        return res.status(400).json({
            message:"Unable to process request at this time",
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
    addMoney,
    withdrawMoney,
    updateProfile,
    getUserTags,
    addUserTag,
    // addFavoriteTag,
    updateUserTag,
    getUserSpendings,
    createSpendingRecord,
    getNumberOfSpendingsPerTag,
    getSpendingsPerTag,
    userVerification,
    otpVerification
}