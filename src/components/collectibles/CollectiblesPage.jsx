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




 //? Fisher-Yates Shuffle Algorithm, Knuth Shuffle. Used to randomly shuffle the elements of an array. 
 //? the Fisher-Yates Shuffle algorithm iterates over the array from the end to the beginning, swapping each element with another randomly chosen element that comes before it (or could be itself). 
  const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;
    // as long as the currentIndex is not 0, the while loop will run. 
    while (currentIndex !== 0) {
      // Math.random generates a random floating-point number between 0 & 1, multiplies by currentIndex and math. Floor rounds down to the nearest whole number. 
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // Swap operation. It uses array destructuring to swap the elements. 
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
