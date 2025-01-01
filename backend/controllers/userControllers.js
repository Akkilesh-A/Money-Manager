import { Transactions, User } from "../models/index.js"
import jwt from "jsonwebtoken"
import { cloudinaryUpload } from "../middlewares/index.js"
import mongoose from "mongoose"

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
    getUserProfile,
    addMoney,
    withdrawMoney,
    updateProfile,
    getUserTags,
    addUserTag,
    updateUserTag,
    getUserSpendings,
    createSpendingRecord,
    getNumberOfSpendingsPerTag,
    getSpendingsPerTag,
}