import { ReactNode, useState } from 'react'
import {  ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui"
import NavBar from './navbar'
import SideBar from './side-bar'

const Layout = ({children,className}:{children:ReactNode,className?:string}) => {

  const [isSideBarClosed, setIsSideBarClosed] = useState(false)

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