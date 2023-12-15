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
    getAllCollectiblesAndUser()
      .then(data => {
        const shuffledCollectibles = shuffleArray([...data]);
        setCollectibles(shuffledCollectibles);
      });
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


  const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  };
  


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
