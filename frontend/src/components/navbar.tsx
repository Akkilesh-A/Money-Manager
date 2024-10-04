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

const NavBar = () => {
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
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem className="flex gap-4 items-center"><UserIcon/> Profile</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={()=>{
                        localStorage.removeItem("token")
                        window.location.href="/signIn"
                    }} className="flex gap-4 items-center"><LogOut/> Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>
  )
}

export default NavBar