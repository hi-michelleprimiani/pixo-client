import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { Avatar } from '@radix-ui/themes';
import { NavLink, useNavigate } from "react-router-dom";

export const ProfileDropDown = ({userId, pixoUser, setToken}) => {

  const navigate = useNavigate()

    return (
        <>
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
        </>
    )
}