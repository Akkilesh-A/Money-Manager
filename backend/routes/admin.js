import {Router} from 'express'
import { signUp } from '../controllers/adminController.js';

const router = Router();

router.get("/",(req,res)=>{
    res.send("Admin Route Working! 😁")
})

router.post("/signup",signUp)

export default router