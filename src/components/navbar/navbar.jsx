import { NavLink, useNavigate } from "react-router-dom";
import { Avatar } from '@radix-ui/themes';
import { useEffect, useState } from "react";
import { getPixoUserById } from "../managers/PixoUserManager";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@radix-ui/react-dropdown-menu'

export const NavBar = ( {userId, setToken }) => {
  const [pixoUser, setPixoUser] = useState([])
  const navigate = useNavigate();


  useEffect(() => {
    getPixoUserById(userId).then(setPixoUser)
  }, [userId])


  return (
    <nav className="m-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <NavLink to="/" className="flex-shrink-0 flex items-center text-black hover:text-green">
              <span className="ml-2 text-2xl font-bold">Pixo</span>
            </NavLink>
          </div>
          <div className="m-5 flex-shrink-0 flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <Avatar src={pixoUser?.img_url} fallback={pixoUser.user?.full_name} />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-white shadow-lg rounded-md py-1 mt-2 w-48 border border-gray-200 z-50"
              >
                <NavLink to="/profile">
                <DropdownMenuItem
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                  Profile
                </DropdownMenuItem>
                  </NavLink>
                  <NavLink to="/create">
                <DropdownMenuItem
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                  Post New Item
                </DropdownMenuItem>
                  </NavLink>
                <DropdownMenuItem
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setToken("");
                    navigate("/login");
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};