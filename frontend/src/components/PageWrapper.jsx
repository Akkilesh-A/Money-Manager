import React from 'react'

const PageWrapper = ({children}) => {
  return (
    <div className='p-16 flex-1 min-h-screen bg-[#CFF1EF]'>
    {children}
    </div>
  )
}

export default PageWrapper