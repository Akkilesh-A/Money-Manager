import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { Admin } from '../models/adminSchema.js';
dotenv.config();

const jwtSecret = process.env.ADMIN_JWT_SECRET

async function adminAuthMiddleware(req,res,next){
    const authorization = req.headers.authorization.split(" ")[1]

   try{
        const isValid = jwt.verify(authorization,jwtSecret)
        const adminId= isValid._id
        const existingAdmin = Admin.findById(adminId)
        if(!existingAdmin){
            return res.status(403).json({
                "message" : "Admin not found"
            })
        }else{
            req.adminId = adminId
            next()
        }        
   }catch(err){
    return res.status(403).json({
        "message" : "Auth failed"
    })
   }
}

export { adminAuthMiddleware }