import React, { useState } from 'react'

const SignIn = () => {

  const [signinRole,setSigninRole]=useState("CHILD")

  return (
    <div className='flex h-screen w-screen'>
      <div className='flex gap-8'>
        {signinRole=="CHILD" && 
        <div>
          Child Sign In
        </div>}
        {signinRole=="PARENT" && 
        <div>
          User Sign In
        </div>}
      </div>
      <div className='flex gap-8 justify-center items-center'>
        <button onClick={()=>{setSigninRole("CHILD")}}className={`${signinRole=="CHILD"?"bg-purple-500":"bg-white"} duration-300 p-4 rounded text-[1.2rem]`}>Child SignIn</button>
        <button onClick={()=>{setSigninRole("PARENT")}}className={`${signinRole=="PARENT"?"bg-purple-500":"bg-white"} duration-300 p-4 rounded text-[1.2rem]`}>Parent SignIn</button>
      </div>
    </div>
  )
}

export default SignIn