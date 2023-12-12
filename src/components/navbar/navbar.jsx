import { NavLink, useNavigate } from "react-router-dom";
import { Select } from '@radix-ui/themes';
import { useEffect, useState } from "react";
import { getPixoUserById } from "../managers/PixoUserManager";
import { getAllCategories } from "../managers/CategoriesManager";
import { ProfileDropDown } from "./ProfileDropDown";
import { CategoryFilter } from "../collectibles/CategoryFilter";

export const NavBar = ( {userId, setToken, categories, selectedCategory, setSelectedCategory }) => {
  const [pixoUser, setPixoUser] = useState([])


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
          <CategoryFilter className=""
          categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          <div className="m-5 flex-shrink-0 flex items-center">
            <ProfileDropDown userId={userId} pixoUser={pixoUser} setToken={setToken}/>
          </div>
        </div>
      </div>
    </nav>
  );
};