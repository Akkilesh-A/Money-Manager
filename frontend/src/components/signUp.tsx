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

interface signUpInputs{
    name: string,
    email: string,
    phoneNumber: string,
    password: string,
    confirmPassword: string
}

export function SignUpForm() {

    const {register, handleSubmit} = useForm<signUpInputs>()

    async function onSubmit(data: signUpInputs){
        console.log(data)
        const dataToBeSent={
            email: data.email,
            password: data.password,
            name: data.name,
            phoneNumber: data.phoneNumber,
        }
        const response=await fetch("http://localhost:8000/api/v1/adult/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToBeSent)
        }
        )
        const responseData=await response.json()
        console.log(responseData)    
        if(response.status!==200){
            toast.error(responseData.message)
            return
        }
        toast.success(responseData.message)    
    }
    

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
                    <Input {...register("name")} id="name" placeholder="Your name" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Email</Label>
                    <Input {...register("email")} id="name" placeholder="user@example.com" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Phone Number</Label>
                    <Input {...register("phoneNumber")} id="name" placeholder="Your name" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Password</Label>
                    <Input {...register("password")} id="name" placeholder="Your name" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Confirm Password</Label>
                    <Input {...register("confirmPassword")} id="name" placeholder="Your name" />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button type="submit" >Deploy</Button>
            </CardFooter>
        </form>
    </Card>
  )
}
