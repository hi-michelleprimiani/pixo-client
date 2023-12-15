import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPixoUserAndCollectiblesById } from "../managers/PixoUserManager";
import { ProfileDropDown } from "./ProfileDropDown";

export const NavBar = ({ userId, setToken }) => {
  const [pixoUser, setPixoUser] = useState([]);

  useEffect(() => {
    getPixoUserAndCollectiblesById(userId).then(setPixoUser);
  }, [userId]);

  return (
    <nav className="m-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Pixo Link on the left */}
          <NavLink to="/" className="flex-shrink-0 flex items-center text-black hover:text-green">
            <span className="text-2xl font-bold">Pixo</span>
          </NavLink>

          {/* Right-aligned items */}
          <div className="flex items-center">
            {/* Profile Dropdown */}
            <ProfileDropDown userId={userId} pixoUser={pixoUser} setToken={setToken}/>
            {/* Shopping Cart Icon */}
            <NavLink to="/cart" className="text-black hover:text-green ml-8">
              <i className="fas fa-shopping-cart fa-lg"></i>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};
