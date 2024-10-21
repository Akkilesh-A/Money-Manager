import { User } from "../models/index.js"

async function getAllUsers(req,res){
    try{
        const allUsers =await User.find()
        const dataToBeSent=allUsers.map((user,index)=>{
            return(
                {
                    index:index,
                    name:user.name,
                    userId:user.id
                }
            )
        })

        return res.status(200).json({
            message:"Success",
            data:dataToBeSent
        })
    }catch(err){
        return res.status(404).json({
            message:"Unable to get at this time!",
            data:null
        })
    }
    
}

export const appControllers= {
    getAllUsers
}