import {Router} from 'express'
import { signUp, signIn, addBalance } from '../controllers/adminController.js';
import { adminAuthMiddleware } from '../utilities/adminAuthMiddleware.js';

const router = Router();

router.get("/",(req,res)=>{
    res.send("Admin Route Working! 😁")
})

router.post("/signup",signUp)
router.post("/signin",signIn)
router.get("/getconnectionstatus",adminAuthMiddleware)
router.post("/addbalance",adminAuthMiddleware,addBalance)

export default router