import { 
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Input,
    Label,
 } from "./ui"
 import {useForm} from "react-hook-form"
 import { toast } from "sonner"
 import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../backendURL"

interface signUpInputs{
    email: string,
    password: string,
}

export function SignInForm() {
    const navigate=useNavigate()

    const {register, handleSubmit} = useForm<signUpInputs>()

    async function onSubmit(data: signUpInputs){
        const dataToBeSent={
            email: data.email,
            password: data.password
        }
        const response=await fetch(`${BACKEND_URL}/api/v1/user/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToBeSent)
        }
        )
        const responseData=await response.json()
        if(response.status!==200){
            toast.error(responseData.message)
            return
        }
        await localStorage.setItem("money-manager-token",responseData.token)
        toast.success(responseData.message)  
        navigate("/home") 
    }

    useEffect(() => {
        const token=localStorage.getItem("money-manager-token")
        if(token){
            toast.success("Session Restored!")
            navigate("/home")
        }
    }, [])     

  return (
    <Card className="w-[350px]">
        <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader>
                <CardTitle>Sign In </CardTitle>
                <CardDescription>Fill in your details and continue!</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Email</Label>
                    <Input {...register("email",{
                        required: "This field is required"
                    })} id="name" placeholder="user@example.com" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Password</Label>
                    <Input {...register("password",{
                        required: "This field is required"
                    })} id="name" type="password" placeholder="" />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <div className="text-sm">
                    New here?{" "}
                    <Link to="/signup" className="underline " >
                        Sign Up
                    </Link>
                </div>
                <Button type="submit" >Sign In</Button>
            </CardFooter>
        </form>
    </Card>
  )
}