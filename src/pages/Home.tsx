// import { useEffect } from "react"
import { toast, Toaster } from 'sonner';
import { useLoggedInUserQuery, useLogoutUserMutation } from "../redux/userapi";
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useEffect } from 'react';
import { setToast } from '../redux/userSlice';
const Home = () => {
  const {data} = useLoggedInUserQuery()
  const showToast = useAppSelector(state => state.user.toast)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if(showToast){
      toast.success("Signed in successfully.")
      dispatch(setToast(false))
    }
  },[showToast])

  return (
    <div>hi</div>
  )
}

export default Home