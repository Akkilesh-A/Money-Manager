import {Router} from 'express'
import { signUp,signIn, getProfile, updateProfile, sendMoney, getTransactions, addTags, removeTag, bulk } from '../controllers/userController.js';
import { userAuthMiddleware } from '../utilities/userAuthMiddleware.js';
import multer from 'multer';

const upload = multer({dest : 'uploads/'})
const router = Router();

router.get("/",(req,res)=>{
    res.send("User Route Working! 😁")
})

router.post("/signin",signIn)
router.post("/signup",signUp)
router.get("/users",userAuthMiddleware, bulk)
router.get("/getprofile",userAuthMiddleware,getProfile)
router.patch("/updateprofile",userAuthMiddleware,upload.single('image'),updateProfile)
router.post("/sendmoney",userAuthMiddleware,sendMoney)
router.get("/gettransactions",userAuthMiddleware,getTransactions)
router.post("/addTags",userAuthMiddleware,addTags)
router.delete("/removetag",userAuthMiddleware,removeTag)

export default router