import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronLeft, faCircleChevronRight, faMoneyBillTransfer, faSackDollar, faTags, faHouse } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

export const SideBar = () => {
  const [expanded,setExpanded] = useState(true)
  return (
    <aside className={`h-screen sticky top-0 ${expanded ? "w-[19vw]" : "w-[5vw] "}`}>
      <nav className="h-full shadow-2xl border-r-purple-400 flex flex-col">


        <div className={`p-4 flex  items-center ${expanded ? "justify-between" : ""}`}>
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`transition-all ${
              expanded ? "w-32" : "w-0 invisible"
            }`}
            alt=""
          />
          <div onClick={()=>setExpanded(!expanded)} className={`relative shadow-sm right-0 rounded-full bg-purple-200 p-2`}>
            {expanded ? <FontAwesomeIcon icon={faCircleChevronLeft} className='text-purple-500' size='2x'/> : <FontAwesomeIcon icon={faCircleChevronRight} className='text-purple-500' size='2x'/>}
          </div>
        </div>


        {expanded? <ul className='m-2 duration-300 flex flex-col p-2 flex-1 transition-all'>
          <li className='hover:bg-gray-200 cursor-pointer hover:border hover:rounded-md flex  items-center   text-[1.2rem] font-semibold p-4'><p className='w-[10%]'><FontAwesomeIcon icon={faHouse} /> </p> <p className='px-2 transition-all'>Home</p></li>
          <li className='hover:bg-gray-200 cursor-pointer hover:border hover:rounded-md flex  items-center   text-[1.2rem] font-semibold p-4'><p className='w-[10%]'><FontAwesomeIcon icon={faSackDollar} /> </p> <p className='px-2 transition-all'>Send Money</p></li>
          <li className='hover:bg-gray-200 cursor-pointer hover:border hover:rounded-md flex  items-center   text-[1.2rem] font-semibold p-4'><p className='w-[10%]'><FontAwesomeIcon icon={faMoneyBillTransfer} /> </p> <p className='px-2 transition-all'>Transactions </p></li>
          <li className='hover:bg-gray-200 cursor-pointer hover:border hover:rounded-md flex  items-center   text-[1.2rem] font-semibold p-4'><p className='w-[10%]'><FontAwesomeIcon icon={faTags} /> </p> <p className='px-2 transition-all'>Customize Tags</p></li>
        </ul>: <ul className='m-2 duration-300 flex flex-col items-center p-2 flex-1 transition-all'>
          <li className='hover:bg-gray-200 cursor-pointer hover:border hover:rounded-md text-[1.2rem] w-[90%] flex justify-center font-semibold p-4'><FontAwesomeIcon icon={faHouse} /></li>
          <li className='hover:bg-gray-200 cursor-pointer hover:border hover:rounded-md text-[1.2rem] w-[90%] flex justify-center font-semibold p-4'><FontAwesomeIcon icon={faSackDollar} /></li>
          <li className='hover:bg-gray-200 cursor-pointer hover:border hover:rounded-md text-[1.2rem] w-[90%] flex justify-center font-semibold p-4'><FontAwesomeIcon icon={faMoneyBillTransfer} /></li>
          <li className='hover:bg-gray-200 cursor-pointer hover:border hover:rounded-md text-[1.2rem] w-[90%] flex justify-center font-semibold p-4'><FontAwesomeIcon icon={faTags} /></li>
        </ul>}


        <div className='m-2 p-4 flex items-center gap-4'>
          <div  className={`${expanded ? 'w-[20%] hover:scale-125' : "mb-4 scale-150 " }  cursor-pointer duration-300 relative shadow-sm flex justify-center items-center rounded-full bg-purple-200 p-2`}>
            <img src='https://res.cloudinary.com/djeplonq5/image/upload/c_crop,ar_1:1/v1719914709/file_jmjj10.png' />
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
