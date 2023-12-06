import { useEffect, useState } from "react";
import { getAllCollectibles } from "../managers/CollectibleManager";
import { Grid, Card, Inset, AspectRatio } from '@radix-ui/themes';

export const CollectiblesList = () => {
  const [collectibles, setCollectibles] = useState([]);

  useEffect(() => {
    getAllCollectibles()
      .then((data) => {
        setCollectibles(data);
      })
      .catch((error) => {
        console.error("Error fetching collectibles:", error);
      });
  }, []);

  return (
    <Grid columns="4" gap="3" width="auto">
      {collectibles.map((collectible) => (
        <Card key={collectible.id}>
        <Inset clip="padding-box" side="top" pb="current">
        <AspectRatio ratio={2 / 2}>

        {collectible.images.length > 0 && (
            <img 
            src={collectible.images[0].img_url} 
            alt={collectible.name} 
            style={{
                display: 'block',
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                backgroundColor: 'var(--gray-5)',
              }}
            />
            )}
            </AspectRatio>
            </Inset>
          <h2 className="text-xl font-bold">{collectible.name}</h2>
          <p>${collectible.price}</p>
        </Card>
      ))}
    </Grid>
  );
};