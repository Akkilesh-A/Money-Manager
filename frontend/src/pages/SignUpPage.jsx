import { useForm } from 'react-hook-form'
import {useNavigate} from "react-router-dom"
import zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useState } from 'react'

import {ToastMessage} from "../components"

import "react-toastify/dist/ReactToastify.css";
import { FaSpinner } from "react-icons/fa";

const signUpSchema = zod.object({
    email: zod.string().email().min(7),
    name: zod.string().min(3),
    password: zod.string().min(8),
    confirmPassword: zod.string().min(8)
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  });
  

const SignUpPage = () => {
    const navigate=useNavigate()
    const {register, handleSubmit, setError,formState:{errors, isSubmitting},reset}=useForm({resolver:zodResolver(signUpSchema)})
    const [signinRole,setSigninRole]=useState("PARENT")

    const onParentSubmit=async (data)=>{
        if(data.password!==data.confirmPassword){
            setError("confirmPassword",{
                message:"Passwords don't match!"
            })
            
            return
        }
        try{    
            const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/signup`,data)
            if(response.status==200){
                ToastMessage("success","Sign Up Successful!")
                navigate("/")
            }else{
                ToastMessage("error",response.data.message || "Sign Up Failed!")
            }
        }catch(err){
            const errorMessage = err.response?.data?.message || err.message || "An error occurred";
            ToastMessage("error", errorMessage);

            if (err.response?.status === 400) {
                setError("root", {
                    message: "Email already taken!"
                });
            } else {
                setError("root", {
                    message: errorMessage
                });
            }  
        }
    }

    const onChildSubmit=async (data)=>{
        if(data.password!==data.confirmPassword){
            setError("confirmPassword",{
                message:"Passwords don't match!"
            })
            
            return
        }
        try{    
            const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signup`,data)
            if(response.status==200){
                ToastMessage("success","Sign Up Successful!")
                navigate("/")
            }else{
                ToastMessage("error",response.data.message || "Sign Up Failed!")
            }
        }catch(err){
            const errorMessage = err.response?.data?.message || err.message || "An error occurred";
            ToastMessage("error", errorMessage);

            if (err.response?.status === 400) {
                setError("root", {
                    message: "Email already taken!"
                });
            } else {
                setError("root", {
                    message: errorMessage
                });
            }  
        }
    }

  return (
       <div className='bg-purple-200 gap-8  flex flex-col m-auto justify-center items-center max-h-screen max-w-screen px-32 py-32 '>
        {signinRole=="PARENT" && 
        <div className='md:flex justify-center items-center shadow-lg rounded-xl bg-white '>
            <div className='w-1/2 rounded-l-lg hidden lg:flex justify-center items-center bg-purple-200'>
                <img src='parent.png' /> 
            </div>
            <form onSubmit={handleSubmit(onParentSubmit)} className=" lg:w-1/2 flex flex-col gap-4 justify-center p-16">
                <h1>Parent Sign Up!</h1>
                <div className='flex flex-col gap-2'>
                    <h2>Email Id</h2>

                    <input {...register("email")} 
                    type="text" placeholder='Enter Email' className=' p-2 text-[1.2rem] text-purple-600 rounded-md bg-purple-200 border-2 border-purple-600' />

                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <h2>Name</h2>
                    <input {...register("name")} type="text" placeholder='Enter Name' className=' p-2 text-[1.2rem] text-purple-600 rounded-md bg-purple-200 border-2 border-purple-600' />

                    {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <h2>Password</h2>
                    <input {...register("password")} type="password" placeholder='Enter Password' className='p-2 text-[1.2rem] text-purple-600 rounded-md bg-purple-200 border-2 border-purple-600' ></input>
                    {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <h2>Confirm Password</h2>
                    <input {...register("confirmPassword")} type="password" placeholder='Enter Password' className='p-2 text-[1.2rem] text-purple-600 rounded-md bg-purple-200 border-2 border-purple-600' />
                    {errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword.message}</p>}
                </div>
                <button disabled={isSubmitting} className='m-auto px-4 py-2 border bg-yellow-400 rounded-md font-semibold'>{isSubmitting ?<FaSpinner /> : "Sign Up!"}</button>
                {errors.root && <p className='text-red-500'>{errors.root.message}</p>}
            </form>
        </div>}

        {signinRole=="CHILD" && 
        <div className='md:flex justify-center items-center shadow-lg rounded-xl bg-white '>
            <form onSubmit={handleSubmit(onChildSubmit)} className=" lg:w-1/2 flex flex-col gap-4 justify-center p-16">
                <h1>Child Sign Up!</h1>
                <div className='flex flex-col gap-2'>
                    <h2>Email Id</h2>

                    <input {...register("email")} 
                    type="text" placeholder='Enter Email' className=' p-2 text-[1.2rem] text-purple-600 rounded-md bg-purple-200 border-2 border-purple-600' />

                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <h2>Name</h2>
                    <input {...register("name")} type="text" placeholder='Enter Name' className=' p-2 text-[1.2rem] text-purple-600 rounded-md bg-purple-200 border-2 border-purple-600' />

                    {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <h2>Password</h2>
                    <input {...register("password")} type="password" placeholder='Enter Password' className='p-2 text-[1.2rem] text-purple-600 rounded-md bg-purple-200 border-2 border-purple-600' ></input>
                    {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <h2>Confirm Password</h2>
                    <input {...register("confirmPassword")} type="password" placeholder='Enter Password' className='p-2 text-[1.2rem] text-purple-600 rounded-md bg-purple-200 border-2 border-purple-600' />
                    {errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword.message}</p>}
                </div>
                <button disabled={isSubmitting} className='m-auto px-4 py-2 border bg-yellow-400 rounded-md font-semibold'>{isSubmitting ?<FaSpinner /> : "Sign Up!"}</button>
                {errors.root && <p className='text-red-500'>{errors.root.message}</p>}
            </form>
            <div className='w-1/2 rounded-l-lg hidden lg:flex justify-center items-center bg-purple-200'>
                <img src='child.png' /> 
            </div>
        </div>}

        <div className='flex gap-8 justify-center items-center'>
            <button onClick={()=>{setSigninRole("CHILD")}}className={`${signinRole=="CHILD"?"bg-purple-500":"bg-white"} duration-300 p-4 rounded text-[1.2rem]`}>Child SignUp</button>
            <button onClick={()=>{setSigninRole("PARENT")}}className={`${signinRole=="PARENT"?"bg-purple-500":"bg-white"} duration-300 p-4 rounded text-[1.2rem]`}>Parent SignUp</button>
        </div>

       </div>
  )
}

export default SignUpPage