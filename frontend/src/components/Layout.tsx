import { ReactNode } from 'react'
import NavBar from './navbar'

const Layout = ({children,className}:{children:ReactNode,className?:string}) => {
  return (
    <>
        <NavBar />
        <div className={`px-16 ${className}`}>
            {children}
        </div>
    </>
  )
}

export default Layout