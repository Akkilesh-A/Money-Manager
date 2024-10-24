import { useEffect, useState } from "react"
import { 
    Badge,
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
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../backendURL"
import { Eye, EyeOff } from "lucide-react"

interface signUpInputs{
    name: string,
    email: string,
    phoneNumber: string,
    password: string,
    confirmPassword: string
}

export function SignUpForm() {
    const navigate=useNavigate()

    const [eyeOpen,setEyeOpen]=useState(false)

    const {register, handleSubmit, formState:{errors}} = useForm<signUpInputs>()

    async function onSubmit(data: signUpInputs){
        const dataToBeSent={
            email: data.email,
            password: data.password,
            name: data.name,
            phoneNumber: data.phoneNumber,
        }
        const response=await fetch(BACKEND_URL+"/api/v1/user/signup", {
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
        toast.success(responseData.message)  
        await localStorage.setItem("money-manager-token", responseData.token)
        navigate("/signin") 
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
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Fill in your details and get started!</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid w-full items-center gap-4">
                    <div className="space-y-1">
                        <Label htmlFor="name">Name</Label>
                        <Input {...register("name",{
                            required: "This field is required",
                            minLength: {value: 3, message: "Name should be atleast 3 characters long"}
                        })} id="name" placeholder="Your name" />
                        {errors.name && <Badge variant={"destructive"}>{errors.name.message}</Badge>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="framework">Email</Label>
                        <Input {...register("email",{
                            required: "This field is required",
                            pattern: {value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Invalid email"}
                        })} id="name" placeholder="user@example.com" />
                        {errors.email && <Badge variant={"destructive"}>{errors.email.message}</Badge>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="framework">Phone Number</Label>
                        <Input {...register("phoneNumber",{
                            required: "This field is required",
                            pattern: {value: /^[0-9]{10}$/, message: "Invalid phone number"}
                        })} id="name" placeholder="1234567890" />
                        {errors.phoneNumber && <Badge variant={"destructive"}>{errors.phoneNumber.message}</Badge>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="framework">Password</Label>
                        <Input {...register("password",{
                            required: "This field is required",
                            minLength: {value: 6, message: "Password should be atleast 6 characters long"}
                        })} id="name" type="password" placeholder="Password"/>
                        {errors.password && <Badge variant={"destructive"}>{errors.password?.message}</Badge>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="framework">Confirm Password</Label>
                        <Input  {...register("confirmPassword",{
                            required: "This field is required",
                            validate: value => value === "password" || "Passwords do not match"
                        })} id="name" type={eyeOpen ? "text" : "password"} placeholder="Confirm Password"/>
                        <div className="relative -top-8 -right-64">
                            {eyeOpen ? <Eye className="cursor-pointer" onClick={()=>setEyeOpen(false)}/> : <EyeOff className="cursor-pointer" onClick={()=>setEyeOpen(true)}/>}
                        </div>
                        {errors.confirmPassword && <Badge variant={"destructive"}>{errors.confirmPassword.message}</Badge>}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <div className="text-sm">
                    New here?{" "}
                    <Link to="/signin" className="underline " >
                        Sign In
                    </Link>
                </div>
                <Button type="submit" >Sign Up</Button>
            </CardFooter>
        </form>
    </Card>
  )
}
