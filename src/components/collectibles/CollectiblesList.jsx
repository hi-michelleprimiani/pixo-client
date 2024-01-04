import { Grid, Card, Inset, AspectRatio, Container } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

export const CollectiblesList = ({ collectibles }) => {
  const navigate = useNavigate();

  return (
    <Container className="lg (1024px)">
      <Grid columns="4" gap="4" width="auto">
        {collectibles.map((collectible) => (
          <Card
            key={collectible.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => {
              navigate(`/item/${collectible.id}`);
            }}
          >
            <Inset clip="padding-box" side="top" pb="current">
              <AspectRatio ratio={1 / 1}>
                {collectible.images.length > 0 && (
                  <img
                  src={collectible.images[0].img_url}
                  alt={collectible.name}
                  className="block object-cover w-full h-full"
                />
                )}
              </AspectRatio>
            </Inset>
            <h2 className="text-xl font-bold">{collectible.name}</h2>
            <p>${collectible.price}</p>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};
