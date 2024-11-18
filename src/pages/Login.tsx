import { useForm, SubmitHandler } from "react-hook-form"
import { LoginSchema, LoginType} from "../utils/zod-types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"
import { useLoggedInUserQuery, useLoginUserMutation } from "../redux/userapi"
import { SpinnerCircular } from "spinners-react"
import {Toaster, toast} from "sonner"
import { useEffect } from "react"
import { useAppDispatch } from "../redux/hooks"
import { setToast } from "../redux/userSlice"
const Login = () => {
    const {data: userData} = useLoggedInUserQuery()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [loginUser, {isLoading, data, status}] = useLoginUserMutation()
    const {register, handleSubmit, formState: {errors}} = useForm<LoginType>({
        resolver: zodResolver(LoginSchema)
    })

    useEffect(() => {
        if(status === 'rejected')
            toast.error("Invalid credentials.")
    }, [status])

    useEffect(() => {
        if(userData?.userId){
           navigate("/")
        }
    },[userData])

    useEffect(() => {
        if(data){
            dispatch(setToast(true))
            navigate("/")
        }
    }, [data])

    const onSubmit:SubmitHandler<LoginType> = async (data: LoginType)=> {
        await loginUser(data)
    }
   
    return (
        <>
            <Toaster position="top-center"/>
            <div className="w-fit mx-auto my-auto flex flex-col gap-5">
                <h1 className="text-4xl md:text-6xl font-bold">Login</h1>
                <form className="space-y-5">
                    <div className="flex flex-col">
                        <label className="font-semibold">E-mail</label>
                        <input className="w-[300px] outline outline-gray-300 py-0.5 md:py-1 pl-1" {...register("email")} type = "text" placeholder="Enter your Password."/>
                        {errors?.email && <span className="text-red-500">{errors.email.message}</span>}
                    </div>
                    <div className="flex flex-col">
                        <label className="font-semibold">Password</label>
                        <input className="w-[300px] outline outline-gray-300 py-0.5 md:py-1 pl-1" {...register("password")} type = "password" placeholder="Enter your Password."/>
                        {errors?.password && <span className="text-red-500">{errors.password.message}</span>}
                    </div>
                </form>
                <div className="">
                    <button onClick={handleSubmit(onSubmit)} className="bg-blue-600 text-white flex items-center justify-center font-bold md:text-xl md:w-[200px] md:h-[40px] shadow-md rounded-md hover:bg-blue-700" type = "submit">{isLoading ? <SpinnerCircular size = {20} color="#ffffff" secondaryColor="#C3C7CA"/>:"Login"}</button>
                    <div className="text-sm md:text-md">
                        <span>Not Registered yet? </span>
                        <Link to = "/register"><span className="underline text-gray-500">Sign up here</span></Link>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default Login