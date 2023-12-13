import { useEffect, useState } from "react";
import { getCollectibleById } from "../managers/CollectibleManager";
import { useParams } from "react-router-dom";
import { Avatar, Button, Box, Container, Tabs, Text } from '@radix-ui/themes';
import { HeartFilledIcon, AvatarIcon } from '@radix-ui/react-icons'


export const CollectibleDetails = () => {
  const [chosenCollectible, setChosenCollectible] = useState({});
  const { itemId } = useParams();

  useEffect(() => {
    getCollectibleById(itemId).then(setChosenCollectible);
  }, [itemId]);

  return (
    <Container className="lg (1024px)">
    <Box size={2} className="flex justify-between mb-28">
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
                    margin: '10px'
                }}
                />
                ))
                )}
      </Box>
      <Box className="flex flex-col" style={{ width: '40%' }}>
        <div className="mb-4">
          <h1 className="text-4xl font-bold mb-4">{chosenCollectible.name}</h1>
          <div className="text-3xl font-bold mb-4">${chosenCollectible.price}</div>
          <div className="whitespace-pre-wrap">{chosenCollectible.description}</div>

        </div>
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
        <Tabs.Root defaultValue="materials">
          <Tabs.List>
            <Tabs.Trigger value="materials">Materials</Tabs.Trigger>
            <Tabs.Trigger value="size">Size</Tabs.Trigger>
            <Tabs.Trigger value="color">Color</Tabs.Trigger>
          </Tabs.List>
          <Box px="4" pt="3" pb="2">
            <Tabs.Content value="materials">
              <Text size="3">{chosenCollectible.material}</Text>
            </Tabs.Content>

            <Tabs.Content value="size">
              <Text size="3">{chosenCollectible.size}</Text>
            </Tabs.Content>

            <Tabs.Content value="color">
              <Text size="3">{chosenCollectible.color}</Text>
            </Tabs.Content>
          </Box>
        </Tabs.Root>
        </div>
      </Box>
    </Box>
</Container>
  );
}  

            