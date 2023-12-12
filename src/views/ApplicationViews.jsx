import { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Login } from '../components/auth/Login';
import { Register } from '../components/auth/Register';
import { CollectibleDetails } from '../components/collectibles/CollectibleDetails';
import { ProfileView } from '../components/profile/ProfileView';
import { CreateCollectibleForm } from '../components/collectibles/CreateCollectibleForm';
import { EditCollectibleForm } from '../components/collectibles/EditCollectibleForm';
import { CollectiblesPage } from '../components/collectibles/CollectiblesPage';
import { NavBar } from '../components/navbar/navbar';
import { getAllCategories } from '../components/managers/CategoriesManager';

export const ApplicationViews = ({ token, setToken, userId, setCurrentUserId }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');



  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  const isAuthenticated = () => localStorage.getItem("auth_token");

  return (
    <div>
      {isAuthenticated() && <NavBar  userId={userId} setToken={setToken} categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />}
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} setCurrentUserId={setCurrentUserId} />} />
        <Route path="/register" element={<Register setToken={setToken} setCurrentUserId={setCurrentUserId} />} />
        {isAuthenticated() ? (
          <>
            <Route path="/" element={<CollectiblesPage categories={categories} selectedCategory={selectedCategory} />} />
            <Route path="/item/:itemId" element={<CollectibleDetails />} />
            <Route path="/profile" element={<ProfileView userId={userId} />} />
            <Route path="/create" element={<CreateCollectibleForm />} />
            <Route path="/edit/:itemId" element={<EditCollectibleForm userId={userId} />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </div>
  );
};
