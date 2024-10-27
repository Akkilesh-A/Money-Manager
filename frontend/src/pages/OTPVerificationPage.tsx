import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Card, CardHeader, CardContent, InputOTP,InputOTPGroup,InputOTPSeparator,InputOTPSlot, CardFooter, Button, Badge, CardDescription, CardTitle } from '../components/ui'
import { BACKEND_URL } from '../backendURL'
const OTPVerificationPage = () => {

    const [otp,setOtp]=useState(0)

    const navigate=useNavigate()

    useEffect(() => {
        const otpToken=localStorage.getItem("OTP-token")
        if(!otpToken){
            navigate("/signup")
        }
    }, [])  

    async function handleSubmit(){
        if(!otp || otp.toString().length<6){
            return
        }
        try{
            const dataToBeSent={
                token:localStorage.getItem("OTP-token"),
                otp:otp
            }
            const response=await fetch(BACKEND_URL+"/api/v1/user/otp-verification", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToBeSent)
            })
            const responseData=await response.json()
            if(!responseData.isVerified){
                toast.error("Error processign your request")
                return
            }
            await localStorage.removeItem("OTP-token")
            await localStorage.setItem("money-manager-token",responseData.token)
            toast.success("SignUp successful!")
            navigate("/home")

        }catch(err){
            console.log(err)
        }
    }

  return (
    <div className='flex justify-center h-[100dvh] items-center'>
        <Card>
            <CardHeader>
                <CardTitle>
                    OTP Verification
                </CardTitle>
                <CardDescription>
                    Check your mail for OTP!
                </CardDescription>
            </CardHeader>

            <CardContent className='space-y-2'>
                <InputOTP onChange={(e)=>{
                    setOtp(parseInt(e))
                    }} maxLength={6}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
                {otp.toString().length<6 && <Badge variant={"destructive"}>Enter valid OTP</Badge>}
            </CardContent>
            <CardFooter className='flex justify-end'>
                <Button onClick={handleSubmit}>Verify!</Button>
            </CardFooter>
        </Card>
    </div>
  )
}

export default OTPVerificationPage