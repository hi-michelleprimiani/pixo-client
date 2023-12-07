import { useEffect, useState } from "react";
import { getCollectibleById } from "../managers/CollectibleManager";
import { useParams } from "react-router-dom";
import { Avatar, Button, Box, Container } from '@radix-ui/themes';
import { HeartFilledIcon, AvatarIcon } from '@radix-ui/react-icons'


export const CollectibleDetails = () => {
  const [chosenCollectible, setChosenCollectible] = useState({});
  const { itemId } = useParams();

  useEffect(() => {
    getCollectibleById(itemId).then(setChosenCollectible);
  }, [itemId]);

  return (
    <Container className="lg (1024px)">
    <Box size={2} className="flex justify-between">
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
          <h1 className="text-4xl font-bold mb-4">{chosenCollectible.name}</h1>
          <div className="text-3xl font-bold mb-4">${chosenCollectible.price}</div>
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
          <div className="ml-10">
        <Button variant="outline"><AvatarIcon/>Message Seller</Button>
          </div>
        </div>
        <div className="mb-2 text-center flex flex-row justify-center">
        <Button>Add To Cart</Button>
        <div className="ml-5">
        <Button><HeartFilledIcon/>Add To Favorites</Button>
        </div>
        </div>
        <div>
          <p className="mb-2">Material: {chosenCollectible.material}</p>
          <p className="mb-2">Size: {chosenCollectible.size}</p>
          <p>Color: {chosenCollectible.color}</p>
        </div>
      </Box>
    </Box>
</Container>
  );
}  

            