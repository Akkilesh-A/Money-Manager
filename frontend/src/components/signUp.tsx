import { useEffect } from "react"
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
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../backendURL"

interface signUpInputs{
    name: string,
    email: string,
    phoneNumber: string,
    password: string,
    confirmPassword: string
}

export function SignUpForm() {
    const navigate=useNavigate()

    const {register, handleSubmit} = useForm<signUpInputs>()

    async function onSubmit(data: signUpInputs){
        const dataToBeSent={
            email: data.email,
            password: data.password,
            name: data.name,
            phoneNumber: data.phoneNumber,
        }
        const response=await fetch(BACKEND_URL+"/api/v1/adult/signup", {
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
        await localStorage.setItem("token", responseData.token)
        navigate("/signin") 
    }

    useEffect(() => {
        const token=localStorage.getItem("token")
        if(token){
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
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Name</Label>
                        <Input {...register("name",{
                            required: "This field is required",
                            minLength: {value: 3, message: "Name should be atleast 3 characters long"}
                        })} id="name" placeholder="Your name" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="framework">Email</Label>
                        <Input {...register("email",{
                            required: "This field is required",
                            pattern: {value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Invalid email"}
                        })} id="name" placeholder="user@example.com" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="framework">Phone Number</Label>
                        <Input {...register("phoneNumber",{
                            required: "This field is required",
                            pattern: {value: /^[0-9]{10}$/, message: "Invalid phone number"}
                        })} id="name" placeholder="9999999999" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="framework">Password</Label>
                        <Input {...register("password",{
                            required: "This field is required",
                            minLength: {value: 6, message: "Password should be atleast 6 characters long"}
                        })} id="name" type="password" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="framework">Confirm Password</Label>
                        <Input {...register("confirmPassword",{
                            required: "This field is required",
                            validate: value => value === "password" || "Passwords do not match"
                        })} id="name" type="password" />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button type="submit" >Sign Up</Button>
            </CardFooter>
        </form>
    </Card>
  )
}
