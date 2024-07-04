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
        min:0
    },
    tags :{
        type : [String],
        required : true,
        default : ['Friends','Family','Online','Shopping','Food']
    }

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
    }
})

const Transactions = mongoose.model('Transactions',transactionsSchema)


export {User, Transactions}