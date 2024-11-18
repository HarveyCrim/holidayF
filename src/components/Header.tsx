import { GiHamburgerMenu } from "react-icons/gi";
import { useLoggedInUserQuery, useLogoutUserMutation } from "../redux/userapi";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Header = () => {
  const {data, isLoading} = useLoggedInUserQuery()
  const {pathname} = useLocation()
  const navigate = useNavigate()
  const [logoutUser, {data:loggedOut}] = useLogoutUserMutation()
  useEffect(() => {
    
  },[loggedOut])

  console.log(data)
  if(isLoading){
    console.log("loading")
    return (<></>)
  }
  return (
    <div className="flex justify-between px-4 md:px-8 py-4 md:py-6 bg-blue-600 items-center">
        <span className="tracking-tight text-white text-xl md:text-3xl font-bold">
            Holidayyy!
        </span>
        {!data?.userId && pathname == "/register" && <Link to = "/login"><span className="cursor-pointer hidden hover:bg-blue-900 text-sm md:text-lg font-bold bg-blue-800 text-white shadow-md px-3 py-1 md:py-0 md:flex items-center rounded-md">
            Sign in
        </span></Link>}
        {!data?.userId && pathname == "/login" && <Link to = "/register"><span className="cursor-pointer hidden hover:bg-blue-900 text-sm md:text-lg font-bold bg-blue-800 text-white shadow-md px-3 py-1 md:py-0 md:flex items-center rounded-md">
            Sign up
        </span></Link>}
        {
          data?.userId && <div className="flex gap-1">
            <Link to = "/mybookings"><span className="cursor-pointer hidden hover:bg-gray-400 text-sm md:text-lg font-bold bg-white text-blue-500 shadow-lg px-3 py-1 md:py-1 md:flex items-center border-1 border-r-black">
            My Bookings
        </span></Link>
            <Link to = "/myhotels"><span className="cursor-pointer hidden hover:bg-gray-400 text-sm md:text-lg font-bold bg-white text-blue-500 shadow-md px-3 py-1 md:py-1 md:flex items-center">
                My Hotels
            </span></Link>
            <span onClick = {() => logoutUser()} className="cursor-pointer hidden hover:bg-black text-sm md:text-lg font-bold bg-blue-900 text-white shadow-md px-3 py-1 md:py-1 md:flex items-center rounded-md">
                Logout
            </span>
          </div>
        }
        <GiHamburgerMenu className="md:hidden fill-white" size={23}/>
    </div>
  )
}

export default Header