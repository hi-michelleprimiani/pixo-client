import { NavLink, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <NavLink
              to="/"
              className="flex-shrink-0 flex items-center text-blue-600 hover:text-purple-700"
            >
              <span className="ml-2 text-xl font-bold">Pixo</span>
            </NavLink>
          </div>
          <div className="hidden sm:ml-6 sm:flex">
            <NavLink
              to="/profile"
              className="text-left px-3 py-2 rounded-md text-sm font-medium text-blue-600 hover:text-purple-700"
            >
              Profile
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};
