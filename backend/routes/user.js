import express,{Router} from 'express'

const router = Router();

router.get("/",(req,res)=>{
    res.send("User Route Working! 😁")
})

router.post("/signin")
router.post("/signup")
router.get("/balance")
router.get("/profile")
router.post("/update")
router.post("/sendmoney")
router.get("/transactions")
export default router