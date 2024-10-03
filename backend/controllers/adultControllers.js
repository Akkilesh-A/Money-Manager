import { z } from "zod"
import { signInBody } from "./zodTypes.js"


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
    }catch(err){
        return res.status(400).json({
            message:"Field/s are not of requirements"
        }) 
        console.log(err.message)
    }

    res.status(200).json({
        message:"SignIn successful!"
    })
}


export {
    signIn
}