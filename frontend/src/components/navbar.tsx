import { DollarSignIcon, LogOut, UserIcon } from "lucide-react"
import { 
    H3, 
    AvatarFallback,
    AvatarImage,
    Avatar,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
 } from "./ui"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { ModeToggle } from "./mode-toggle"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../backendURL"

const NavBar = () => {
    const navigate=useNavigate()

    const [userData,setUserData]=useState({
        "_id": "6700172eb49fe6f5b71b4fc0",
        "name": "Akkilesh A",
        "email": "akkilalagar05@gmail.com",
        "password": "$2b$10$v1QMp3DLIXX8S/snbHKDeelaZhks7j9PlcdkazgF1Gd8OuN.vuBvq",
        "imgURL": "https://res.cloudinary.com/djeplonq5/image/upload/v1719914709/file_jmjj10.png",
        "accountBalance": 0,
        "phoneNumber": "9500094303",
        "tags": [
            "Online",
            "Food",
            "Shopping",
            "Travel",
            "Others"
        ],
        "favoriteTags": [],
        "transactions": [],
        "transactionTags": [],
        "spendingsPerTag": {
            "Online": 0,
            "Food": 0,
            "Shopping": 0,
            "Travel": 0,
            "Others": 0
        },
        "childConnectionStatus": false,
        "children": [],
    })

    useEffect(()=>{
        const token=localStorage.getItem("token")
        console.log(token)
        if(token!=null){
            console.log("Token is present")
            async function getData(){
                const response= await fetch(`${BACKEND_URL}/api/v1/adult/get-data`,{
                    method:"GET",
                    headers:{
                        "authorization":`Bearer ${token}`
                    },
                })
                const data=await response.json()
                setUserData(data.data)
                console.log(userData)
            }
            getData()
        }
        // else{
        //     navigate("/signin")
        // }
    },[])

  return (
    <div className="w-full p-4 flex justify-between items-center">
        <div className="flex gap-4 items-center">
            <DollarSignIcon />
            <H3>Money Manager</H3>
        </div>
        <div className="flex gap-4 items-center">
            <a target="_blank" href="https://github.com/Akkilesh-A/Money-Manager" className="p-2 rounded-md border ">
                <GitHubLogoIcon width={20} height={20} />
            </a>
            <div className="dark:text-[#262626] text-[#e5e5e5]">{"|"}</div>
            <ModeToggle />
            <div className="dark:text-[#262626] text-[#e5e5e5]">{"|"}</div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarImage src={userData.imgURL} width={100} height={100}/>
                        <AvatarFallback>{userData.name.slice(0)}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem ><Link className="flex gap-4 items-center" to={"/profile"}><UserIcon/> Profile</Link></DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={()=>{
                        localStorage.removeItem("money-manager-token")
                        navigate("/signin")
                    }} className="flex gap-4 items-center"><LogOut/> Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>   
        </div>
    </div>
  )
}

export default NavBar