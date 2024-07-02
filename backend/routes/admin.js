import {Router} from 'express'
import { signUp, signIn, bulk, addBalance } from '../controllers/adminController.js';
import { adminAuthMiddleware } from '../middleware/adminAuthMiddleware.js';

const router = Router();

router.get("/",(req,res)=>{
    res.send("Admin Route Working! 😁")
})

router.post("/signup",signUp)
router.post("/signin",signIn)
router.post("/users",adminAuthMiddleware, bulk)
router.post("/addbalance",adminAuthMiddleware,addBalance)

export default router