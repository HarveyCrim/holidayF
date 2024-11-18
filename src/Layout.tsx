import Footer from "./components/Footer"
import Header from "./components/Header"
import Hero from "./components/Hero"

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="min-h-screen flex flex-col">
        <Header />
        <Hero />
        {children}
        <Footer />
    </div>
  )
}

export default Layout