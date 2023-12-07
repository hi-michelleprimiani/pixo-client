import { Navigate, Outlet } from "react-router-dom"
import { NavBar } from "../components/navbar/navbar"


export const Authorized = ( {userId}) => {
  if (localStorage.getItem("auth_token")) {
    return <>
      <NavBar userId={userId} />
      <div className="p-5">
        <Outlet />
      </div>
    </>
  }
  return <Navigate to='/login' replace />
}
