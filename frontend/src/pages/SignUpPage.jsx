import React from 'react'
import { CardComponent, PageWrapper } from '../components'

const SignUpPage = () => {
  return (
       <div className='md:flex min-h-screen min-w-screen hidden'>
            <div className='w-1/2 shadow-lg flex justify-center items-center bg-purple-200'>
                <h1 className='absolute top-10 left-10 text-[4rem] font-bold text-purple-600'>Money Manager</h1>
                <img src='girl_saving_money.png' /> 
            </div>
            <div className='w-1/2 p-16 flex items-center justify-center '>
                <CardComponent>
                    <div className='flex flex-col items-center gap-4 justify-center'>
                        <h1>Sign Up!</h1>
                        <div className='flex flex-col gap-2'>
                            <h2>Email Id</h2>
                            <input type="text" placeholder='Enter Email' className='min-w-[60%] p-2 text-[1.2rem] text-purple-600 rounded-md bg-purple-200 border-2 border-purple-600' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h2>Password</h2>
                            <input type="text" placeholder='Enter Password' className='min-w-[60%] p-2 text-[1.2rem] text-purple-600 rounded-md bg-purple-200 border-2 border-purple-600' />
                        </div>
                        <button className='min-w-[30%] px-4 py-2 border bg-yellow-400 rounded-md font-semibold'>Add Tag</button>
                    </div>
                </CardComponent>
            </div>
       </div>
  )
}

export default SignUpPage