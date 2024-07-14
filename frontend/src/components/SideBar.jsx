import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft, faCircleChevronRight, faMoneyBillTransfer, faSackDollar, faTags, faHouse, faUser } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import {Link} from 'react-router-dom'

export default function SideBar () {
  const [expanded,setExpanded] = useState(true)
  return (
    <aside className={`h-screen hidden md:block md:sticky top-0`}>
      <nav className="h-full shadow-2xl border-r-purple-400 flex flex-col">
        <div className={`p-4 flex items-center ${expanded ? "justify-between" : "justify-center"}`}>
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`transition-all ${
              expanded ? "w-32" : "w-0 invisible"
            }`}
            alt=""
          />
          <div onClick={()=>setExpanded(!expanded)} className={`relative cursor-pointer shadow-sm right-0 rounded-full bg-purple-200 p-2`}>
            {expanded ? <FontAwesomeIcon icon={faCircleChevronLeft} className='text-purple-500' size='2x'/> : <FontAwesomeIcon icon={faCircleChevronRight} className='text-purple-500' size='2x'/>}
          </div>
        </div>


        {expanded? 
        <ul className='m-2 duration-300 flex flex-col p-2 flex-1 transition-all'>
          <ExpandedSideBarItem to="/" icon={faHouse} text="Home" />
          <ExpandedSideBarItem to="/sendmoneypage" icon={faSackDollar} text="Send Money" />
          <ExpandedSideBarItem to="/transactions" icon={faMoneyBillTransfer} text="Transactions" />
          <ExpandedSideBarItem to="/customizetags" icon={faTags} text="Customize Tags" />
        </ul>
        : 
        <ul className='m-2 duration-300 flex flex-col items-center p-2 flex-1 transition-all'>
          <SideBarItem to="/" icon={faHouse} />
          <SideBarItem to="/sendmoneypage" icon={faSackDollar} />
          <SideBarItem to="/transactions" icon={faMoneyBillTransfer} />
          <SideBarItem to="/customizetags" icon={faTags} />
</ul>
        }


        <div className='m-2 p-4 flex items-center gap-4'>
          <div  className={`cursor-pointer duration-300 relative shadow-sm flex justify-center items-center rounded-full hover:border-purple-400 border-purple-200 border-2`}>
            <img src='https://res.cloudinary.com/djeplonq5/image/upload/c_crop,ar_1:1/v1719914709/file_jmjj10.png' width={60}/>
          </div>
          <div className={`${expanded ? 'flex-1 leading-5' : "w-0 hidden" }`}>
              <h1 className={`text-[1.3rem]`}>Username</h1>
              <h2>username@gmail.com</h2>
          </div>
        </div>


      </nav>
    </aside>
  )
}

function ExpandedSideBarItem({to,icon,text}){
  return(
    <Link to={`${to}`}><li className='hover:bg-gray-200 cursor-pointer hover:border hover:rounded-md flex  items-center   text-[1.2rem] font-semibold p-4'><p className='w-[10%]'><FontAwesomeIcon icon={icon} /> </p> <p className='px-2 transition-all'>{`${text}`}</p></li></Link>
  )
}

function SideBarItem({to,icon}){
  return(
    <Link to={to}><li className='hover:bg-gray-200 cursor-pointer hover:border hover:rounded-md text-[1.2rem] w-[90%] flex justify-center font-semibold p-4'><FontAwesomeIcon icon={icon} /></li></Link>
  )
}