import { NavLink, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <NavLink
              to="/"
              className="flex-shrink-0 flex items-center text-green-600 hover:text-black"
            >
              <span className="ml-2 text-2xl font-bold">Pixo</span>
            </NavLink>
          </div>
          <div className="flex-shrink-0 flex items-center text-green-600 hover:text-black">
            <NavLink
              to="/profile"
              className="ml-2 text-2xl font-bold"
            >
              Profile
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};
