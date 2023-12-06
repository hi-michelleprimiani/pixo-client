import { useEffect, useState } from "react";
import { getCollectibleById } from "../managers/CollectibleManager";
import { useParams } from "react-router-dom";
import { Avatar, Button, Box, Container } from '@radix-ui/themes';


export const CollectibleDetails = () => {
  const [chosenCollectible, setChosenCollectible] = useState({});
  const { itemId } = useParams();

  useEffect(() => {
    getCollectibleById(itemId).then(setChosenCollectible);
  }, [itemId]);

  return (
    <Container className="lg (1024px)">

    <Box size={2} className="flex justify-between">
      {/* Left Column for Images */}
      <Box className="flex flex-col items-center" style={{ width: '60%' }}>
        {chosenCollectible.images && chosenCollectible.images.length > 0 && (
            chosenCollectible.images.map((image) => (
                <img
                key={image.id}
                src={image.img_url}
                alt={chosenCollectible.name}
                style={{
                    display: 'block',
                    objectFit: 'cover',
                    width: '60%',
                    height: '100%',
                    backgroundColor: 'var(--gray-5)',
                }}
                />
                ))
                )}
      </Box>
      {/* Right Column for Details */}
      <Box className="flex flex-col" style={{ width: '40%' }}>
        {/* Description and other text-based details */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold">{chosenCollectible.name}</h1>
          <p>{chosenCollectible.description}</p>
        </div>
        {/* User information and actions */}
        <div className="flex items-center mb-4">
          <Avatar
            fallback={chosenCollectible.seller?.user.first_name}
            src={chosenCollectible.seller?.img_url}>
          </Avatar>
          <div className="ml-2">
            <p>{chosenCollectible.seller?.user.first_name} {chosenCollectible.seller?.user.last_name} - User Rating</p>
          </div>
        </div>
        <Button className="btn-primary">Add To Cart</Button>
        <Button className="btn-secondary">Add To Favorites</Button>
        <div>
          <p>Material: {chosenCollectible.material}</p>
          <p>Size: {chosenCollectible.size}</p>
        </div>
      </Box>
    </Box>
</Container>
  );
            }  