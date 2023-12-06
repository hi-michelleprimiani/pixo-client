import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { CollectiblesList } from "../components/collectibles/CollectiblesList";

export const ApplicationViews = ({ token, setToken, userId, setCurrentUserId }) => {

    
  return (
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} setCurrentUserId={setCurrentUserId} />} />
      <Route path="/register" element={<Register setToken={setToken} setCurrentUserId={setCurrentUserId} />} />
      <Route path="/" element={<Authorized token={token} userId={userId} />}>
        <Route index element={<CollectiblesList /> } />
      </Route>
    </Routes>
  );
};
