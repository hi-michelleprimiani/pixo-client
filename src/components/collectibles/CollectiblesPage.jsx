import { useEffect, useState } from "react";
import { getAllCollectiblesAndUser } from "../managers/CollectibleManager";
import { getAllCategories } from "../managers/CategoriesManager";
import { CategoryFilter } from "./CategoryFilter";
import { CollectiblesList } from "./CollectiblesList";

export const CollectiblesPage = () => {
  const [collectibles, setCollectibles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredCollectibles, setFilteredItems] = useState([]);

  useEffect(() => {
    getAllCollectiblesAndUser().then(setCollectibles);
    getAllCategories().then(setCategories);
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredItems(collectibles);
    } else {
      // Parse selectedCategory as an integer
      const selectedCategoryId = parseInt(selectedCategory);
      // Filter collectibles where the categories array includes the selectedCategoryId
      const filtered = collectibles.filter(collectible => 
        collectible.categories.includes(selectedCategoryId)
      );
  
      setFilteredItems(filtered);
    }
  }, [selectedCategory, collectibles]);
  
  return (
    <>
      <CategoryFilter
        categories={categories} 
        setSelectedCategory={setSelectedCategory} 
        selectedCategory={selectedCategory} 
      />
      <CollectiblesList collectibles={filteredCollectibles} />
    </>
  );
};
