import { Outlet } from "react-router-dom"
import NavBar from "../components/Shared/NavBar/NavBar"
import Footer from "../components/Shared/Footer/Footer"

const Main = () => {
  return (
    <div>
      <NavBar></NavBar>
     <div className="pt-28 pb-20">
     <Outlet></Outlet>
     </div>
     <Footer></Footer>
    </div>
  )
}

export default Main
