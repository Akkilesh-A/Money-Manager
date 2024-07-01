import zod from 'zod'
import {Admin} from '../db/connection.js'

const signUpBody=zod.object({
    email : zod.string().email().min(7),
    name: zod.string().min(3),
    password : zod.string().min(6)
})

async function signUp(req,res){
    const email= req.body.email
    const name= req.body.name
    const password= req.body.password
    const success = signUpBody.safeParse({email,name,password})
    if(!success.success){
        return res.status(400).json({
            message : "Check your details again!"
        })
    }

    const existingUser= await Admin.findOne({
        email
    })
    if(existingUser){
        return res.status(400).json({
            message : "User exisits already!"
        })

    }
    const newUser = await Admin.create({
        email,
        name,
        password
    })
    res.status(200).json({
        message : `Details from form are ${name} , ${email}, ${password} , ${newUser._id}`
    })
}


export {signUp}