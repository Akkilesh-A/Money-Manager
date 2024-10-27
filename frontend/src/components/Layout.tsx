import { ReactNode, useState } from 'react'
import {  ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui"
import NavBar from './navbar'
import SideBar from './side-bar'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Layout = ({children,className}:{children:ReactNode,className?:string}) => {
  const navigate=useNavigate()
  const [isSideBarClosed, setIsSideBarClosed] = useState(false)

  useEffect(() => {
    const token=localStorage.getItem("money-manager-token")
    if(!token){
        navigate("/signin")
      }
  }, [])   

  return (
    <>  
      <NavBar />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel 
          className="sm:block hidden min-h-[90vh]" 
          defaultSize={20} 
          maxSize={30} 
          minSize={15} 
          collapsedSize={5} 
          collapsible 
          onCollapse={()=>setIsSideBarClosed(true)} 
          onExpand={()=>setIsSideBarClosed(false)}
        >
          <SideBar isSideBarClosed={isSideBarClosed} />
        </ResizablePanel>
        <ResizableHandle className='sm:flex hidden' withHandle />
        <ResizablePanel className={`px-4 sm:px-8 py-4 ${className}`}>
            {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  )
}

export default Layout