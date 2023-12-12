import { useEffect, useState } from "react";
import { getAllCollectiblesAndUser } from "../managers/CollectibleManager";
import { CollectiblesList } from "./CollectiblesList";

export const CollectiblesPage = ({ categories, selectedCategory }) => {
  const [collectibles, setCollectibles] = useState([]);
  const [filteredCollectibles, setFilteredCollectibles] = useState([]);

  useEffect(() => {
    getAllCollectiblesAndUser().then(setCollectibles);
  }, []);

  useEffect(() => {
    const filtered = selectedCategory === 'all' 
      ? collectibles 
      : collectibles.filter(collectible => collectible.categories.includes(parseInt(selectedCategory)));
    setFilteredCollectibles(filtered);
  }, [selectedCategory, collectibles]);

  return <CollectiblesList collectibles={filteredCollectibles} />;
};
