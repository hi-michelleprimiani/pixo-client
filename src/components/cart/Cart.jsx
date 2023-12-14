import { useEffect, useState } from "react";
import { getCartByUser } from "../managers/CartManager";
import { useNavigate } from "react-router-dom";
import { AspectRatio, Button, Card, Container, Grid, Inset } from "@radix-ui/themes";

export const Cart = () => {
    const [cartData, setCartData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getCartByUser().then(setCartData);
    }, []);

    return (
        <Container className="lg (1024px)">
            <Grid columns="1" width="auto">
                {cartData && cartData.items && cartData.items.map(item => (
                    <Card key={item.collectible.id} style={{maxWidth: 240}}
                          className="cursor-pointer hover:shadow-lg transition-shadow flex">
                        <div style={{ flexBasis: '50%' }}>
                            <AspectRatio ratio={1 / 1}>
                                {item.collectible.images && item.collectible.images.length > 0 && (
                                    <img
                                        src={item.collectible.images[0].img_url}
                                        alt={item.collectible.name}
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
                        </div>
                        <div style={{ flexBasis: '50%', padding: '20px' }}>
                            <h2 className="text-xl font-bold">{item.collectible.name}</h2>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: ${item.collectible.price}</p>
                            <Button onClick={()=>{ navigate(`/item/${item.collectible.id}`)}}>
                                View Item
                            </Button>
                        </div>
                    </Card>
                ))}
            </Grid>
        </Container>
    );
};
