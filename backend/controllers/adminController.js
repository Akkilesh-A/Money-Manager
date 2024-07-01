import zod from 'zod'
import {Admin} from '../db/connection.js'
import bcrypt from 'bcrypt'

const signUpBody=zod.object({
    email : zod.string().email().min(7),
    name: zod.string().min(3),
    password : zod.string().min(6)
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
    const existingUser= await Admin.findOne({
        email
    })
    if(existingUser){
        return res.status(400).json({
            message : "User exisits already!"
        })

    }
    //hashing password
    const hash = await bcrypt.hash(password,10)
    //creating a new user
    const newUser = await Admin.create({
        email,
        name,
        password : hash
    })
    res.status(200).json({
        message : `Details from form are ${name} , ${email}, ${hash} , ${newUser._id}`
    })
}


export {signUp}