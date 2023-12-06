import { Navigate, Outlet } from "react-router-dom"
import { NavBar } from "../components/navbar/navbar"


export const Authorized = () => {
  if (localStorage.getItem("auth_token")) {
    return <>
      <NavBar />
      <div className="p-4">
        <Outlet />
      </div>
    </>
  }
  return <Navigate to='/login' replace />
}
