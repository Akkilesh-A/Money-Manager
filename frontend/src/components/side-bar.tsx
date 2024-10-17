import {  BarChartBig, DollarSign, Home, Sidebar, Tags, } from "lucide-react"
import {  H3, H4 } from "./ui"
import {  ReactNode } from "react"
import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom';


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

    const location = useLocation()
       

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
                                activeTab={location.pathname} 
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
                            <Link to={sidebarLink.route} className={`flex p-4 dark:text-white rounded-md space-x-4 items-center cursor-pointer ${location.pathname == sidebarLink.route ? "bg-[#27272a]" : "" }`} key={index}>
                                {sidebarLink.icon}
                            </Link>
                        )
                    })
                }
            </div>            
        </div>}
    </div>
  )
}

function SideBarButton(
    {icon,title,activeTab,route}
    :
    {icon?:ReactNode,title?:string,activeTab:string,route:string}
    ){
    return(
        <Link to={route} className={`flex p-4 dark:text-white rounded-md space-x-4 items-center cursor-pointer ${activeTab == route ? "bg-[#27272a]" : "" }`}>
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