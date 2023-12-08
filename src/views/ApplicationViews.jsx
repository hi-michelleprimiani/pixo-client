import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { CollectiblesList } from "../components/collectibles/CollectiblesList";
import { CollectibleDetails } from "../components/collectibles/CollectibleDetails";
import { ProfileView } from "../components/profile/ProfileView";
import { CreateCollectibleForm } from "../components/collectibles/CreateCollectibleForm";

export const ApplicationViews = ({ token, setToken, userId, setCurrentUserId }) => {

    
  return (
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} setCurrentUserId={setCurrentUserId} />} />
      <Route path="/register" element={<Register setToken={setToken} setCurrentUserId={setCurrentUserId} />} />
      <Route path="/" element={<Authorized token={token} setToken={setToken} userId={userId} />}>
        <Route index element={<CollectiblesList /> } />
        <Route path="/item/:itemId" element={<CollectibleDetails /> } />
        <Route path="/profile" element={<ProfileView userId={userId}/> } />
        <Route path="/create" element={<CreateCollectibleForm /> } />
      </Route>
    </Routes>
  );
};
