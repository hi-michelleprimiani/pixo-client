import { Navigate, Outlet } from "react-router-dom";
import { NavBar } from "../components/navbar/navbar";

export const Authorized = ({ userId, token, setToken }) => {
  if (localStorage.getItem("auth_token")) {
    return (
      <>
        <NavBar userId={userId} token={token} setToken={setToken} />
        <div className="p-5">
          <Outlet />
        </div>
      </>
    );
  }
  return <Navigate to="/login" replace />;
};
