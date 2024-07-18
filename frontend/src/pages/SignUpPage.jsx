import { useForm } from 'react-hook-form'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import axios from "axios"

import { ToastMessage } from '../components'

const SignUpPage = () => {
    const {register, handleSubmit, formState:{errors, isSubmitting}}=useForm()

    const onSubmit=async (data)=>{
        ToastMessage("Passwords & Confirm Password do not match!", "error");
        console.log(data)
        const response=await axios.post("http://localhost:3000/api/v1/user/signup",data)
    }

  return (
       <div className='bg-purple-200  lg:bg-transparent flex m-auto justify-center items-center min-h-screen min-w-screen p-16'>
        <div className='md:flex shadow-lg '>
            <div className='w-1/2  hidden lg:flex justify-center items-center bg-purple-200'>
                <img src='girl_saving_money.png' /> 
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="lg:w-1/2 flex flex-col gap-4 justify-center p-16">
                <h1>Sign Up!</h1>
                <div className='flex flex-col gap-2'>
                    <h2>Email Id</h2>
                    <input {...register("email",{
                        required:"Email is required!",
                        pattern:{
                            value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                            message:"Invalid email id!"
                        }
                    })} type="text" placeholder='Enter Email' className=' p-2 text-[1.2rem] text-purple-600 rounded-md bg-purple-200 border-2 border-purple-600' />
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <h2>Name</h2>
                    <input {...register("name")} type="text" placeholder='Enter Email' className=' p-2 text-[1.2rem] text-purple-600 rounded-md bg-purple-200 border-2 border-purple-600' />
                </div>
                <div className='flex flex-col gap-2'>
                    <h2>Password</h2>
                    <input {...register("password",{
                        required:"Password is required!",
                        minLength:{
                            value : 8,
                            message : "Minimum length of password must be 8"
                        }
                    })} type="password" placeholder='Enter Password' className='p-2 text-[1.2rem] text-purple-600 rounded-md bg-purple-200 border-2 border-purple-600' ></input>
                    {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <h2>Confirm Password</h2>
                    <input {...register("confirmPassword")} type="password" placeholder='Enter Password' className='p-2 text-[1.2rem] text-purple-600 rounded-md bg-purple-200 border-2 border-purple-600' />
                </div>
                <button disabled={isSubmitting} className='m-auto px-4 py-2 border bg-yellow-400 rounded-md font-semibold'>{isSubmitting ? "Loading..." : "Sign Up!"}</button>
            </form>
        </div>
       </div>
  )
}

export default SignUpPage