import { useEffect, useState } from "react";
import { getAllCollectiblesAndUser } from "../managers/CollectibleManager";
import { getAllCategories } from "../managers/CategoriesManager";
import { CollectiblesList } from "./CollectiblesList";
import { CategoryAndSearchFilter } from "./CategoryAndSearchFilter";

export const CollectiblesPage = () => {
  const [collectibles, setCollectibles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredCollectibles, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getAllCollectiblesAndUser().then((data) => {
      const shuffledCollectibles = shuffleArray([...data]);
      setCollectibles(shuffledCollectibles);
    });
    getAllCategories().then(setCategories);
  }, []);

  useEffect(() => {
    let filtered = collectibles;
    // Filter by category
    if (selectedCategory !== "all") {
      const selectedCategoryId = parseInt(selectedCategory);
      filtered = filtered.filter((collectible) =>
        collectible.categories.includes(selectedCategoryId)
      );
    }
    // Filter by search query. Checks to see if search query is entered
    if (searchQuery) {
      filtered = filtered.filter((collectible) =>
        collectible.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredItems(filtered);
  }, [selectedCategory, collectibles, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  //? Fisher-Yates Shuffle Algorithm, Knuth Shuffle. Used to randomly shuffle the elements of an array.
  //? the Fisher-Yates Shuffle algorithm iterates over the array from the end to the beginning, swapping each element with another randomly chosen element that comes before it (or could be itself).
  const shuffleArray = (array) => {
    let currentIndex = array.length,
      randomIndex;
    // as long as the currentIndex is not 0, the while loop will run.
    while (currentIndex !== 0) {
      // Math.random generates a random floating-point number between 0 & 1, multiplies by currentIndex and math. Floor rounds down to the nearest whole number.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // Swap operation. It uses array destructuring to swap the elements.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  return (
    <>
      <CategoryAndSearchFilter
        categories={categories}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        filteredCollectibles={filteredCollectibles}
      />
      <CollectiblesList collectibles={filteredCollectibles} />
    </>
  );
};
