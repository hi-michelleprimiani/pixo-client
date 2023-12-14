import { useEffect, useState } from "react";
import { getCartByUser } from "../managers/CartManager";
import { useNavigate } from "react-router-dom";
import { AspectRatio, Button, Card, Container, Flex, Inset } from "@radix-ui/themes";

export const Cart = () => {
    const [cartData, setCartData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getCartByUser().then(setCartData);
    }, []);

    const totalPrice = cartData?.items?.reduce((total, item) => {
        return total + (item.quantity * parseFloat(item.collectible.price));
    }, 0) || 0; 


    return (
        <Container className="lg (1024px)">
            <div className="text-2xl font-bold mb-6">Your Cart Has {cartData?.items?.length} Items</div>
                {cartData && cartData.items && cartData.items.map(item => (
                    <Card key={item.collectible.id} style={{maxWidth: 840, maxHeight: 160}} size={3} 
                    className="cursor-pointer hover:shadow-lg transition-shadow flex mb-8" 
                    onClick={()=>{navigate(`/item/${item.collectible.id}`)}}>
                    <Flex align={"center"}>
                        <div style={{ flexBasis: '18%' }}>
                        <Inset clip="padding-box" side="left" pb="current">
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
                                    }}
                                    />
                                    )}
                            </AspectRatio>
                            </Inset>
                        </div>
                        <div style={{ flexBasis: '82%', padding: '20px' }}>
                            <h2 className="text-xl font-bold">{item.collectible.name}</h2>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: ${item.collectible.price}</p>
                        <div className="float-right">
                            <Button variant="soft" color="red">
                                Remove Item From Cart
                            </Button>
                        </div>
                        </div>
                </Flex>
                </Card>
                ))}
            <div className="text-2xl font-bold mb-6 float-right">Total: ${totalPrice.toFixed(2)} </div>
        </Container>
    );
};
