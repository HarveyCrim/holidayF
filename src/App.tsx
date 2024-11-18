import { Route, Routes } from "react-router-dom"
import Layout from "./Layout"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home"
import { Toaster } from "sonner"
function App() {


  return (
    <>
        <Toaster position="top-center" />
        <Routes>
          <Route path = "/" element = {<Layout><Home /></Layout>} />
          <Route path = "/login" element = {<Layout><Login/></Layout>} />
          <Route path = "/register" element = {<Layout><Signup /></Layout>} />
        </Routes>
    </>
  )
}

export default App
