import mongoose from "mongoose"

const transactionSchema = new mongoose.Schema({
    from:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref:"User"
    },
    to:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:"User"
    },
    amount:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true        
    },
    description:{
        type:String,
    },
    dateTime:{
        type: Date,
        required: true,
        default:new Date()
    },
    tag:{
        type:String,
        required:true,
        default:null
    },
    receiptURL:{
        type:String,
        required:true,
        default:null
    }
})

const Transactions=mongoose.model("Transactions",transactionSchema)

export {
    Transactions
}