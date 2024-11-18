import {SubmitHandler, useForm } from "react-hook-form"
import { userSchema, UserType } from "../utils/zod-types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"
import { useLoggedInUserQuery, useRegisterUserMutation } from "../redux/userapi"
import { SpinnerCircular } from 'spinners-react';
import { useEffect } from "react"
const Signup = () => {
  const navigate = useNavigate()
  const {data: userData} = useLoggedInUserQuery()
  const [registerUser, {data, isLoading}] = useRegisterUserMutation()
  const {register, handleSubmit, formState: {errors}} = useForm<UserType>({
    resolver: zodResolver(userSchema)
  })

  useEffect(() => {
    if(data){
        navigate("/login")
    }
  },[data])

  useEffect(() => {
    if(userData){
        navigate("/")
    }
  }, [userData])

  const onSubmit:SubmitHandler<UserType> = async (data:UserType) => {
    const {confirmPassword, ...rest} = data
    await registerUser(rest)
  }

  return (
    <div className="w-fit mx-auto my-auto flex flex-col gap-5">
        <h1 className="text-4xl md:text-6xl font-bold">Create an Account</h1>
        <form className="space-y-5">
            <div className="flex flex-col md:flex-row gap-5">
                <div className="flex flex-col">
                    <label className="font-semibold">First Name</label>
                    <input className="w-[300px] outline outline-gray-300 py-0.5 md:py-1 pl-1" {...register("firstName")} type = "text" placeholder="Enter your First Name."/>
                    {errors?.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
                </div>
                <div className="flex flex-col">
                    <label className="font-semibold">Last Name</label>
                    <input className="w-[300px] outline outline-gray-300 py-0.5 md:py-1 pl-1"{...register("lastName")} type = "text" placeholder="Enter your Last Name."/>
                    {errors?.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
                </div>
            </div>
            <div className="flex flex-col">
                <label className="font-semibold">E-mail</label>
                <input className="w-full outline outline-gray-300 py-0.5 md:py-1 pl-1" {...register("email")} type = "text" placeholder="Enter your e-mail."/>
                {errors?.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>
            <div className="flex flex-col">
                <label className="font-semibold">Password</label>
                <input className="w-full outline outline-gray-300 py-0.5 md:py-1 pl-1" {...register("password")} type = "password" placeholder="Enter your Password."/>
                {errors?.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>
            <div className="flex flex-col">
                <label className="font-semibold">Confirm Password</label>
                <input className="w-full outline outline-gray-300 py-0.5 md:py-1 pl-1" {...register("confirmPassword")} type = "password" placeholder="Confirm your Password."/>
                {errors?.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
            </div>
        </form>
        <div className="">
            <button onClick={handleSubmit(onSubmit)} className="bg-blue-600 text-white flex items-center justify-center font-bold md:text-xl md:w-[200px] md:h-[40px] shadow-md rounded-md hover:bg-blue-700" type = "submit">{isLoading ? <SpinnerCircular size = {20} color="#ffffff" secondaryColor="#C3C7CA"/>:"Create Account"}</button>
            <div className="text-sm md:text-md">
                <span>Already registered? </span>
                <Link to = "/login"><span className="underline text-gray-500">Sign in here</span></Link>
            </div>
            
        </div>
    </div>
  )
}
export default Signup