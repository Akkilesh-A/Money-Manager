import React from 'react'
import { PageWrapper } from '../components'

const SendMoney = () => {
  return (
    <PageWrapper>       
        <div className='flex-1 flex flex-col '>
            <div className='flex flex-col items-center w-[100%] gap-4 justify-center'>
                <img src="default_user.png" alt="default user image" className='w-[60vw] md:w-[40vw] lg:w-[20vw]' />
            </div>

            <div className='flex flex-wrap justify-center items-center flex-col gap-4'>
                <input className='border-black  w-[100%] md:w-[40%] bg-gray-500 rounded text-gray-900 p-3' type='text' placeholder='To?' />
                <input className='border-black  w-[100%] md:w-[40%] bg-gray-500 rounded text-gray-900 p-3' type='text' placeholder='Amount to be sent!'/>
                <textarea className='border-black  w-[100%] md:w-[40%] bg-gray-500 rounded text-gray-900 p-3' placeholder='Description' ></textarea>
                <select className='border-black  w-[100%] md:w-[40%] bg-gray-500 rounded text-gray-900 p-3'>
                    <option className='border-black bg-gray-500 rounded text-gray-900 p-3'>Entertainment</option>
                    <option className='border-black bg-gray-500 rounded text-gray-900 p-3'>Food</option>
                    <option className='border-black bg-gray-500 rounded text-gray-900 p-3'>Custom</option>
                    <option className='border-black bg-gray-500 rounded text-gray-900 p-3'>Miscellaneous</option>
                </select>
                <button className='border-black w-[50%] md:w-[20%] bg-yellow-500 font-semibold rounded text-gray-900 p-3'>Pay $400</button>
            </div> 
        </div>
    </PageWrapper> 
  )
}

export default SendMoney