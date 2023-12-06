import { Navigate, Outlet } from "react-router-dom"
import { NavBar } from "../components/navbar/navbar"


export const Authorized = () => {
  if (localStorage.getItem("auth_token")) {
    return <>
      <NavBar />
      <main className="p-4">
        <Outlet />
      </main>
    </>
  }
  return <Navigate to='/login' replace />
}
