import {  BarChartBig, DollarSign, Home, Sidebar, Tags, } from "lucide-react"
import {  H3, H4 } from "./ui"
import {  ReactNode, useState } from "react"
import { Link } from "react-router-dom"

interface SidebarLinks{
    icon:ReactNode,
    title:string,
    route:string
}

const SidebarLinks=[
    {
        icon:<Home />,
        title:"Home",
        route:"/home"
    },
    {
        icon:<Tags />,
        title:"Tags",
        route:"/tags"
    },
    {
        icon:<BarChartBig />,
        title:"Transactions",
        route:"/transactions"
    },
    {
        icon:<DollarSign />,
        title:"Send Money",
        route:"/send-money"
    },
]

const SideBar = ({isSideBarClosed}:{isSideBarClosed:boolean}) => {

    const [activeTab, setActiveTab] = useState("/home")
    

  return (
    <div className="px-4 py-4">

        {!isSideBarClosed && 
        <div className="space-y-8">
            <div className="flex items-end justify-between">
                <H3>Your Companion</H3>
                <Sidebar /> 
            </div>            
            <div className="flex flex-col gap-2">
                {
                    SidebarLinks.map((sidebarLink,index)=>{
                        return(
                            <SideBarButton 
                                key={index} 
                                icon={sidebarLink.icon} 
                                title={sidebarLink.title} 
                                route={sidebarLink.route}
                                activeTab={activeTab} 
                                setActiveTab={setActiveTab} 
                            />
                        )
                    })
                }
            </div>
        </div>}

        {isSideBarClosed && 
        <div className="flex flex-col justify-center items-center gap-4">
            <div className="flex justify-center items-center">
                <Sidebar />
            </div>
            <div>
                {
                    SidebarLinks.map((sidebarLink,index)=>{
                        return(
                            <div onClick={()=>setActiveTab(sidebarLink.route)} className={`flex p-4 dark:text-white rounded-md space-x-4 items-center cursor-pointer ${activeTab == sidebarLink.route ? "bg-[#27272a]" : "" }`} key={index}>
                                {sidebarLink.icon}
                            </div>
                        )
                    })
                }
            </div>            
        </div>}
    </div>
  )
}

function SideBarButton(
    {icon,title,activeTab,setActiveTab,route}
    :
    {icon?:ReactNode,title?:string,activeTab:string,setActiveTab:(x:string)=>void,route:string}
    ){
    return(
        <Link to={route} onClick={()=>{
            setActiveTab(route)
            
        }} className={`flex p-4 dark:text-white rounded-md space-x-4 items-center cursor-pointer ${activeTab == route ? "bg-[#27272a]" : "" }`}>
            <div className="">
                {icon}
            </div> 
            <H4>
                {title}
            </H4>
        </Link>
    )
}


export default SideBar