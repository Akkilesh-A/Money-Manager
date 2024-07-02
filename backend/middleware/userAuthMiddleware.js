import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { User } from '../models/userSchema.js';
dotenv.config();

const jwtSecret = process.env.USER_JWT_SECRET

async function userAuthMiddleware(req,res,next){
    const authorization = req.headers.authorization.split(" ")[1]

   try{
        const isValid = jwt.verify(authorization,jwtSecret)
        const userId= isValid._id
        const existingUser = User.findById(userId)
        if(!existingUser){
            return res.status(403).json({
                "message" : "user not found"
            })
        }else{
            req.userId = userId
            next()
        }        
   }catch(err){
    return res.status(403).json({
        "message" : "Auth failed"
    })
   }
}

export { userAuthMiddleware }