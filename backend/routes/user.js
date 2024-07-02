import {Router} from 'express'
import { signUp,signIn, getProfile, updateProfile, sendMoney, getTransactions } from '../controllers/userController.js';
import { userAuthMiddleware } from '../utilities/userAuthMiddleware.js';
import multer from 'multer';

const upload = multer({dest : 'uploads/'})
const router = Router();

router.get("/",(req,res)=>{
    res.send("User Route Working! 😁")
})

router.post("/signin",signIn)
router.post("/signup",signUp)
router.get("/profile",userAuthMiddleware,getProfile)
router.post("/update",userAuthMiddleware,upload.single('image'),updateProfile)
router.post("/sendmoney",userAuthMiddleware,sendMoney)
router.get("/transactions",userAuthMiddleware,getTransactions)
export default router