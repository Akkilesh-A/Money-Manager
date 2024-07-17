import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type : String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type : String,
        required:true,
        trim:true,
        minlength:6
    },
    name : {
        type:String,
        required:true,
        trim:true
    },
    imgURL :{
        type : String,
        required:false
    },
    balance:{
        type : Number,
        required : true,
        deafult:0
    },
    tags :{
        type : Object,
        required : true,
        default : {'Friends':0,'Family':0,'Online':0,'Shopping':0,'Food':0}
    },
    adminConnectionStatus :{
        type : Boolean,
        default : false
    },
    adminId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        default : null
    },
})

const User=mongoose.model('User',userSchema)

const transactionsSchema=new mongoose.Schema({
    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    amount:{
        type:Number,
        required:true,
        min:1
    },
    date:{
        type : Date,
        required : true  
    },
    tag :{
        type : String,
    },
    imgURL :{
        type : String,
        required:false
    },
})

const Transactions = mongoose.model('Transactions',transactionsSchema)


export {User, Transactions}