import React from 'react'
import { useEffect,useState } from 'react'


import { CardComponent } from '../components'

const SignUpPage = () => {
  return (
       <div className='flex p-32 px-64 justify-center items-center  min-h-screen min-w-screen '>
        <div className='md:flex shadow-lg hidden'>
            <div className='w-1/2  flex justify-center items-center bg-purple-200'>
                <img src='girl_saving_money.png' /> 
            </div>
            <div className='w-1/2 p-8 flex items-center justify-center '>
                <CardComponent className="flex flex-col gap-4 justify-center p-16">
                    <h1>Sign Up!</h1>
                    <div className='flex flex-col gap-2'>
                        <h2>Email Id</h2>
                        <input type="text" placeholder='Enter Email' className=' p-2 text-[1.2rem] text-purple-600 rounded-md bg-purple-200 border-2 border-purple-600' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h2>Name</h2>
                        <input type="text" placeholder='Enter Email' className=' p-2 text-[1.2rem] text-purple-600 rounded-md bg-purple-200 border-2 border-purple-600' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h2>Password</h2>
                        <input type="text" placeholder='Enter Password' className='p-2 text-[1.2rem] text-purple-600 rounded-md bg-purple-200 border-2 border-purple-600' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h2>Password</h2>
                        <input type="text" placeholder='Enter Password' className='p-2 text-[1.2rem] text-purple-600 rounded-md bg-purple-200 border-2 border-purple-600' />
                    </div>
                    <button className='m-auto px-4 py-2 border bg-yellow-400 rounded-md font-semibold'>Add Tag</button>
                </CardComponent>
            </div>
        </div>
       </div>
  )
}

export default SignUpPage