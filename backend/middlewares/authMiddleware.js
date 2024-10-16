import jwt from "jsonwebtoken"

async function jwtAuthorization(req,res,next){
    try{
        const token=req.headers.authorization.split(" ")[1]
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        if (decoded){
            req.body.authorization=decoded
            next()
        }else{
            return res.status(401).json({
                message:"Unauthorized",
                data:null
            })
        }
    }catch(err){
        return res.status(401).json({
            message:"Unauthorized",
            data:null
        })
    }
}

export {
    jwtAuthorization
}