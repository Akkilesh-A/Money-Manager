import jwt from "jsonwebtoken"

async function jwtAuthorization(req,res,next){
    const token=req.headers.authorization.split(" ")[1]
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        if (decoded){
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